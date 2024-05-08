import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { Cart } from '@/models/Cart'
import supabaseClient from '@/plugins/supaBase'
import type Product from '@/models/Product'
import type { BasketCartDto } from '@/models/BasketCartDto'
import { SupabaseRepository } from '@/repository/SupabaseRepository'


export const useCartStore = defineStore('cart', () => {

  const cartProducts = reactive<Cart[]>([])
  const cartTotal = ref(0)
  const cartWithProductCartAllData = ref<BasketCartDto[]>([])


  const addProductToCart = (cart: Cart) => {
    cartProducts.push(cart)
  }

  const removeProductFromCart = (cart: Cart) => {
    cartProducts.splice(cartProducts.indexOf(cart), 1)
  }


  const getUserCartAsync = async (user_id: string | number): Promise<any> => {
    const { data, error } = await supabaseClient.from('carts')
      .select(
        `
  user_id,product_id,amount,
  products (
    id,
    title,
    price,
    image
  )

`).eq('user_id', user_id)

    if (error) {
      console.error('Error fetching cart data:', error)
      return
    }

    return data
  }


  const getCartCalculations = async (user_id: number | string): Promise<BasketCartDto[]> => {
    const data = await getUserCartAsync(user_id)
    const itemCounts = data?.reduce((acc: any, item: any) => {
      const product = item.products as Product
      const key = item.product_id
      if (!acc.find((obj: any) => obj.id === key)) {

        acc.push({
          id: key,
          count: 0,
          product_name: product.title,
          product_price: product.price,
          product_image: product.image
        })

      }
      const obj = acc.find((obj: any) => {
        return obj.id === key
      })
      obj.count += item.amount
      return acc
    }, [])

    console.log('Item counts:', itemCounts)
    cartWithProductCartAllData.value = itemCounts as BasketCartDto[]
    return itemCounts as BasketCartDto[]

  }


  const addCartWithProduct = async (cartProduct: BasketCartDto, user_id: string | number) => {
    const data = await getCartCalculations(user_id)
    console.log('data => ', data)

  }
  const removeBasket = async (product_id: number | string, user_id: string | number) => {
    const { data } = await supabaseClient.from('carts').select('*')
      .eq('product_id', product_id)

    if (data) {
      console.log(product_id)
      const spRepo = new SupabaseRepository<Cart>('carts')
      console.log(data[0].id)
      const response = await spRepo.deleteAsync(data[0].id)
      await getCartCalculations(user_id)
      console.log('response => ', response)
    }

  }

  const trashBasket = async (product_id: number | string) => {
    console.log('product_id => ', product_id)
    // tabloda ki tüm product_id değerleri ile eşleşen verileri silelim.
    const { data } = await supabaseClient.from('carts').select('*')
      .eq('product_id', product_id)

    if (data) {
      console.log(data)
      supabaseClient.from("carts").delete().eq('product_id', product_id).then(response => {
        console.log('response => ', response)
        //cartWithProductCartAllData.value  içindeki veriyi güncelleyelim.
        cartWithProductCartAllData.value.splice(cartWithProductCartAllData.value.findIndex(item => item.id === product_id), 1)
      })
    }




  }

  return {
    cartWithProductCartAllData,
    cartProducts,
    cartTotal,
    trashBasket,
    addProductToCart,
    removeBasket,
    getUserCartAsync,
    getCartCalculations,
    addCartWithProduct
  }

})
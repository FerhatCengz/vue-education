<script setup lang="ts">
import { useRoute } from 'vue-router'
import Product from '@/models/Product'
import { onMounted, ref, watch } from 'vue'
import { SupabaseRepository } from '@/repository/SupabaseRepository'
import type Category from '@/models/Category'
import type { Cart } from '@/models/Cart'
import { useAuthStore } from '@/stores/authStore'
import { useStores } from '@/stores'
import { message } from 'ant-design-vue'
import type { IUser } from '@/models/IUser'

const route = useRoute()
const products = ref<Product[]>([])
const category = ref<Category>()
const loading = ref<boolean>(true)
const productRepository = new SupabaseRepository<Product>('products')
const categoryRepository = new SupabaseRepository<Category>('categories')
const cartRepository = new SupabaseRepository<Cart>('carts')
const authStore = useAuthStore()
const { createCartStore } = useStores()
const cartStore = createCartStore()
const user = ref<IUser>()

const disabled = ref(false)
const addBasket = async (product: Product) => {
  disabled.value = true
  message
    .loading('Sepete ekleniyor...')
    .then(async () => {
      const { id } = await authStore.getAuthUserAsync()
      const model = await cartRepository.createAsync({
        product_id: product.id,
        amount: 1,
        user_id: id
      } as Cart)

      cartStore.addProductToCart(model)

      disabled.value = false
      return { ...model, ...product }

    })
    .then((model) => {

      console.log('model => ', model)
      cartStore.addCartWithProduct({
          count: model.amount,
          product_image: model.image,
          id: model.id,
          product_name: model.title,
          product_price: model.price
        },
        model.user_id
      )
      message.success('Ürün sepete eklendi')

    })


}
const getProductWithCategory = (): Product[] => {
  productRepository.query().select().eq('category_id', route.params.id).then((queryResponse: any) => {
    products.value = queryResponse.data as Product[]
  })
  loading.value = false
  return products.value
}

const getCategoryId = (id: number | string): Category | null => {
  categoryRepository.getAsync(id).then((response) => {
    category.value = response as Category
    return category.value
  })
  return null

}

watch(() => route.params.id, () => {
  getProductWithCategory()
  getCategoryId(Number(route.params.id))
})


onMounted(() => {
  getProductWithCategory()
  getCategoryId(Number(route.params.id))
  authStore.getAuthUserAsync().then((data) => {
    user.value = data
  })
  loading.value = false


  console.log('user => ', user.value)


})

</script>

<template>

  <a-breadcrumb>
    <a-breadcrumb-item>Kategoriler</a-breadcrumb-item>
    <a-breadcrumb-item>{{ category?.title || '...' }}</a-breadcrumb-item>
    <a-divider></a-divider>
  </a-breadcrumb>

  <div v-if="loading === true">
    <a-skeleton />
  </div>

  <div v-if="!loading">
    <a-row :gutter="16">
      <a-col :span="6" v-for="product in products" :key="product">
        <a-card hoverable style="width: 240px">
          <template #cover>
            <a-image
              placeholder="Yükleniyor..."
              :src="product.image"
              fallback="data:image/png;base64,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"
            />
          </template>

          <template #actions>

            <a-button v-if="user" :disabled="disabled" @click="addBasket(product)" type="primary">
              Sepete Ekle
            </a-button>

          </template>
          <a-card-meta :title="product.title">
            <template #description>
              <p>
                {{ product.description.length > 100 ? product.description.substring(0, 40) + '...' : product.description
                }}</p>

              <a-statistic :value="product.price">
                <template #suffix>₺</template>
              </a-statistic>

            </template>
          </a-card-meta>


        </a-card>
      </a-col>
    </a-row>
  </div>


</template>


<template>


  <div style="text-align: center">
    Toplam :
    <a-statistic :value="total">
      <template #suffix>₺</template>
    </a-statistic>
    <a-divider></a-divider>
  </div>


  <a-spin tip="" :spinning="spinning">

    <a-card style="margin-top: 30px" v-for="item in cartStore.cartWithProductCartAllData" :title="item.product_name"
            :key="item.id">
      <a-card-grid style="width: 50%; text-align: center">
        <a-badge :count="item.count" :number-style="{ backgroundColor: '#52c41a' }">
          <a-image
            style="height: 100px"
            placeholder="Yükleniyor..."
            :src="item.product_image"
            fallback="data:image/png;base64,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"
          />
        </a-badge>
        <a-divider>
          <a-button type="dashed" @click="trashItem(item.id)" danger :icon="h(CloseOutlined)"></a-button>
        </a-divider>
        <a-space wrap>
          <a-button type="ghost" @click="deleteItem(item.id)" :icon="h(MinusOutlined)"></a-button>
          <a-button type="ghost" @click="addItem(item)" :icon="h(PlusOutlined)"></a-button>
        </a-space>
      </a-card-grid>
      <a-card-grid style="width:50%; text-align: center">

        <p>Adet</p>
        <a-statistic :value="item.product_price">
          <template #suffix>₺</template>
        </a-statistic>
        <a-divider></a-divider>

        <p>Toplam</p>
        <a-statistic :value="item.product_price * item.count">
          <template #suffix>₺</template>
        </a-statistic>
      </a-card-grid>
    </a-card>
  </a-spin>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import type { BasketCartDto } from '@/models/BasketCartDto'
import { h } from 'vue'
import {
  PlusOutlined, MinusOutlined,
  CloseOutlined
} from '@ant-design/icons-vue'
import type Product from '@/models/Product'
import { message } from 'ant-design-vue'
import type { Cart } from '@/models/Cart'
import { SupabaseRepository } from '@/repository/SupabaseRepository'


const total = computed(() => {
  return cartStore.cartWithProductCartAllData.map(item => {
    const total: number = item.product_price * item.count
    return {
      total: total
    }
  }).filter((item) => item.total > 0).reduce((acc, item) => acc + item.total, 0)
})
const cartStore = useCartStore()
const authStore = useAuthStore()


const spinning = ref(false)


const trashItem = async (product_id: number) => {
  spinning.value = true
  cartStore.trashBasket(product_id)

  spinning.value = false
}


const addItem = async (product: BasketCartDto) => {
  spinning.value = true
  const cartRepository = new SupabaseRepository<Cart>('carts')
  const { id } = await authStore.getAuthUserAsync()
  const model = await cartRepository.createAsync({
    product_id: product.id,
    amount: 1,
    user_id: id
  } as Cart)

  cartStore.addProductToCart(model)

  const modelObj: any = { ...model, ...product }

  cartStore.addCartWithProduct({
      count: modelObj.amount,
      product_image: modelObj.image,
      id: modelObj.id,
      product_name: modelObj.title,
      product_price: modelObj.price
    },
    modelObj.user_id
  )
  spinning.value = false

}

const deleteItem = async (product_id: number) => {
  spinning.value = true
  const { id } = await authStore.getAuthUserAsync()

  await cartStore.removeBasket(product_id, id)

  spinning.value = false
}

onMounted(async () => {
  const authStore = useAuthStore()
  const { id } = await authStore.getAuthUserAsync()

  await cartStore.getCartCalculations(id)

})

</script>


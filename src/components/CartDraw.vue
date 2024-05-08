<template>
  <a-drawer ref="drawer"
            width="50%"
            :open="open"
            @close="onClose"
            title="Sepet"
            placement="right"
            @after-open-change="afterOpenChange"
  >
    <router-link to="/cart">
      <a-button type="ghost" @click="onClose" :icon="h(FullscreenOutlined)"></a-button>
    </router-link>
    <cart-basket></cart-basket>
  </a-drawer>
</template>
<script lang="ts" setup>


import CartBasket from '@/components/CartBasket.vue'
import { FullscreenOutlined } from '@ant-design/icons-vue'
import { defineProps, defineEmits, h } from 'vue'

defineProps<{
  open: boolean
}>()


const emit = defineEmits(['onClose'])

const afterOpenChange = (bool: boolean) => {
  console.log('open', bool)
}

const onClose = () => {
  emit('onClose', false)
}


</script>


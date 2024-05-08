<template>
  <component :is="layout"></component>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'
import NavbarLayout from '@/views/layouts/NavbarLayout.vue'
import LoginLayout from '@/views/layouts/LoginLayout.vue'
import { ref, watch, markRaw, onMounted } from 'vue'
import supabaseClient from '@/plugins/supaBase'

const route = useRoute()

const layout = ref<any>()


watch(() => route.meta.layout, (value) => {
  console.log(value)
  switch (value) {
    case 'NavbarLayout':
      layout.value = markRaw(NavbarLayout)
      break
    default:
      layout.value = markRaw(LoginLayout)
  }
})


onMounted(async () => {
  // const { data } = await supabaseClient.from('products').select()
  // console.log(data)
})

</script>
<template>
  <div v-if="loading">
    <p>Loading data...</p>
  </div>
  <div v-else>
    <async-component />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, inject } from 'vue'

const asyncComponent = defineAsyncComponent({
  loader: () => import('@/components/AsyncComponent.vue')
})

const loading = inject('loading')
</script>
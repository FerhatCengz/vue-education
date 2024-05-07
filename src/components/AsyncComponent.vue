<template>
  <div v-if="error">
    <p>An error occurred while loading the data.</p>
  </div>
  <div v-else-if="loading">
    <p>Loading data...</p>
  </div>
  <div v-else>
    <h2>{{ loading }}</h2>
    <pre>
      <code>{{ data }}</code>
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import axios from 'axios'

const data = ref([])
const loading = ref(true)
const error = ref(false)

provide('loading', loading)

setTimeout(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      data.value = response.data
      loading.value = false
    })
    .catch(() => {
      error.value = true
      loading.value = false
    })
}, 2000)
</script>
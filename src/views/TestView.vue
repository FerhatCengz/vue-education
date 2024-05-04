<template>
  <div>
    <h1>Test View</h1>
  </div>
</template>


<script setup lang="ts">
import { axiosClient } from '@/plugins/axiosClient'
import { onMounted } from 'vue'

onMounted(async () => {
  const { data } = await axiosClient.get('/todos')
  console.log(data)

})


/*

* import axios from 'axios'

axios.interceptors.request.use(config => {
  // auth token bearer ile gitsin
  config.headers.Authorization = 'Bearer token'
  return config
})

axios.interceptors.response.use(config => {
  console.log('response ===> ', config)
  // 401 hatası alırsam refersh token ile tekrar dene
  if (config.status === 401) {
    // refresh token
    // yeni token ile tekrar dene ve sonrasında tekrar istek at

  }

  return config
})


axios.get('https://jsonplaceholder.typicode.com/todos/1', {
  data: {
    name: 'test'
  }
})
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.error(error)
  })

  */
</script>


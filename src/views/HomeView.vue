<template>
  <h1>Home</h1>

  <button @click="toAbout">Hakkımdaya git</button>

</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

//routerden gelen meta içinde ki titlei alıp tarayıcıda title olarak gösterir
document.title = router.currentRoute.value.meta.title as string


const toAbout = () => {
  // router.push({ path: '/about', query: { name: 'Ahmet' } })

  // id değeri 2 olan about sayfasına git ":id" şeklinde
  router.push({ name: 'about', params: { id: 2 } })
}

</script>
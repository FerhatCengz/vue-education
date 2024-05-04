<template>
  <h1>About</h1>
  <pre>
    {{ route.currentRoute.value.params.id }}
  </pre>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
const route = useRouter()


</script>

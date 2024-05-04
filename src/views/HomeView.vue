<template>
  <ul v-for="(data) in response" :key="data.id">
    <li>{{ data.id }}</li>
    <li>{{ data.title }}</li>
    <li>{{ data.completed }}</li>
    <li>{{ data.userId }}</li>
  </ul>
</template>


<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import type { ITodo } from '@/models/ITodo'


const { response } = useFetch<ITodo[]>('/posts')




</script>



<template>
  <p>id : {{ route.currentRoute.value.params.id }}</p>

  <ul>
    <li v-for="todo in todoStore.todos" :key="todo.id">
      {{ todo.userId }} - {{ todo.id }} - {{ todo.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { useTodoStore } from '@/stores/todo'

const counterStore = useCounterStore()
const todoStore = useTodoStore()
const route = useRouter()


</script>

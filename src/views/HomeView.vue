<template>
  <div>
    <ul>
      <li v-for="todos in todoStore.todos" :key="todos.id">
        {{ todos.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useStores } from '@/stores'

const { createTodoStore } = useStores()

const todoStore = createTodoStore()


</script>
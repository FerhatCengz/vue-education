import { defineStore } from 'pinia'
import { computed, onMounted, reactive, ref } from 'vue'
import type { ITodo } from '@/models/ITodo'
import { useFetch } from '@/composables/useFetch'

export const useTodoStore = defineStore('todo', () => {

  const { response } = useFetch<ITodo[]>('/todos')

  const todos = computed(() => {
    return response.value as ITodo[]
  })



  return {
    todos
  }

})
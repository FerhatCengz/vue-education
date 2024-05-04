import { useCounterStore } from './counter'
import { useTodoStore } from './todo'
import { defineStore } from 'pinia'

export const useNestedStore = defineStore('cart', () => {
  const counterStore = useCounterStore()
  const todoStore = useTodoStore()

  return {
    counterStore,
    todoStore
  }
})
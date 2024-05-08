import { useCounterStore } from './counter'
import { useTodoStore } from './todo'
import { useCartStore } from '@/stores/cartStore'


export const useStores = () => {
  return {
    createCounterStore: useCounterStore,
    createTodoStore: useTodoStore,
    createCartStore: useCartStore
  }
}
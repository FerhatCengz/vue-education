import { useCounterStore } from './counter'
import { useTodoStore } from './todo'

export const useStores = () => {
  return {
    createCounterStore: useCounterStore,
    createTodoStore: useTodoStore
  }
}
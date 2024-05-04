import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore
  = defineStore('counter', () => {

  const count = ref(0)

  const countSingleOrDouble
    = computed(() => {
    return count.value % 2 === 0 ? 'even' : 'odd'
  })


  watch(count, (newCount, oldCount) => {
    console.log(`count changed from ${oldCount} to ${newCount}`)
  })

  onMounted(() => {
    console.log('Counter store mounted')
  })

  function increment() {
    count.value++
  }

  return { count, countSingleOrDouble, increment }
})



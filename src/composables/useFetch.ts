import { ref } from 'vue'

export function useFetch<T>(path: string) {
  const response = ref<T>()
  fetch(`https://jsonplaceholder.typicode.com${path}`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      response.value = res
    })

  return {
    response
  }
}
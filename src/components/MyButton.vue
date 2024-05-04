<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
/*
defineProps({
  bgColor: {
    type: String,
    required: true
  }
})
*/

// defineProps<{
//   bgColor?: 'green' | 'red' | 'blue'
//   text?: string
// }>()

defineProps({
  bgColor: {
    type: String as () => 'green' | 'red' | 'blue' | 'yellow',
    required: false
  },
  text: {
    type: String,
    default: 'My Button'
  }
})


const emits = defineEmits(['button-click', 'change-box'])


const myButtonClick = (e: Event) => {
  count.value++
  emits('button-click', e, count.value)
}

const myChangeBoxChange = (e: Event) => {
  // 1 ile 2 arasında rastgele sayı üretir ama 1 ve 2 dahildir.
  const randomNumber: number = Math.floor(Math.random() * 2) + 1

  emits('change-box', e, randomNumber === 1)
}

</script>

<template>
  <button :class="bgColor" @click="myButtonClick">{{ text }} - {{ count }}</button>
  <input type="checkbox" @change="myChangeBoxChange">
</template>

<style scoped>
button {
  font-size: 20px;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

.yellow {
  background-color: yellow;
}
</style>
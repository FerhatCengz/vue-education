<template>
  <div class="global-search-wrapper" style="width: 300px">
    <a-auto-complete
      v-model:value="value"
      style="width: 1000px"
      @select="onSelect"
      :options="dataSource"
      @search="handleSearch"
      status="warning"
    >
      <template #option="item">
        <div style="display: flex; justify-content: space-between">
          <span>
            <b>{{ item.title }}</b>
          </span>
        </div>
      </template>
      <a-input-search  @search="search" size="large" placeholder="Todo ara" enter-button>

      </a-input-search>
    </a-auto-complete>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
import type { ITodo } from '@/models/ITodo'

const todo = ref<ITodo>({
  id: 0,
  title: '',
  completed: false,
  userId: 0
})

const value = ref('')
const dataSource = ref<ITodo[]>([])
const search = () => {
  console.log(value.value)
}
const onSelect = (value: string) => {
  console.log('onSelect', value)
}

const searchResult = (query: string): ITodo[] => {
  return todoStore.todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .map((data) => ({
      title: data.title,
      userId: data.userId,
      completed: data.completed,
      id: data.id,
      value: data.title
    }))
}
const handleSearch = (val: string) => {
  dataSource.value = val ? searchResult(val) : []
}
</script>

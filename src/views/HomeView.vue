<template>
  <div class="global-search-wrapper" style="width: 300px">
    <a-auto-complete
      v-model:value="value"
      :dropdown-match-select-width="252"
      style="width: 300px"
      :options="dataSource"
      @select="onSelect"
      @search="handleSearch"
    >
      <template #option="item">
        <div style="display: flex; justify-content: space-between">
          <span>
             {{ item.query }}
            <a
              :href="`https://s.taobao.com/search?q=${item.query}`"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          </span>
          <span>{{ item.count }} results</span>
        </div>
      </template>
      <a-input-search size="large" placeholder="input here" enter-button></a-input-search>
    </a-auto-complete>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

interface Option {
  query: string;
  value: string;
}

const value = ref('')
const dataSource = ref<Option[]>([])
const onSelect = (value: string) => {
  console.log('onSelect', value)
}

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

const searchResult = (query: string): Option[] => {
  // Arama sorgusuyla eşleşen meyveleri döndür
  return fruits
    .filter(fruit => fruit.toLowerCase().includes(query.toLowerCase()))
    .map((fruit) => ({
      query: fruit,
      value: `${fruit}`,
    }))
}
const handleSearch = (val: string) => {
  dataSource.value = val ? searchResult(val) : []
}
</script>


<template>

  <a-layout>
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      style="height: 100vh"
    >
      <div class="logo">
        <h1>FC SHOP</h1>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-spin :spinning="categories.length < 1">
          <a-menu-item v-for="category in categories" :key="category.id">
            <router-link :to="'/categories/'+category.id">{{ category.title }}</router-link>
          </a-menu-item>
        </a-spin>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 , 'text-align' : 'right' }">
        <div style="display: flex;justify-content: end;margin-top: 10px">
          <a-button @click="authRouter(user)" :icon="h(UserOutlined)" :disabled="user"
                    style="width: 20%; margin-right: 25px">
            {{ user ? user.mail : 'Giriş yap' }}
          </a-button>
          <shopping-cart-outlined v-if="user" @click="open = !open"
                                  style="font-size: 22px;margin-right: 20px;cursor: pointer;" />

        </div>

      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        FC SHOP ©2024
      </a-layout-footer>
    </a-layout>
  </a-layout>

  <cart-draw :open="open" @on-close="open = false"></cart-draw>

</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore'
import { UserOutlined } from '@ant-design/icons-vue'


const open = ref<boolean>(false)
const authStore = useAuthStore()


import { defineAsyncComponent, h, onMounted, reactive, ref } from 'vue'

const cartDraw = defineAsyncComponent(() => import('@/components/CartDraw.vue'))

import { SupabaseRepository } from '@/repository/SupabaseRepository'
import Category from '@/models/Category'
import {
  ShoppingCartOutlined
} from '@ant-design/icons-vue'
import type { IUser } from '@/models/IUser'
import { useRouter } from 'vue-router'

const selectedKeys = ref<string[]>(['1'])
const categories = reactive<Category[]>([])
const user = ref<IUser>()
const router = useRouter()


const authRouter = (user: IUser | undefined) => {
  user === undefined ? router.push('/login') : router.push('/categories/1')
}


onMounted(async () => {
  const categoryRepo = new SupabaseRepository<Category>('categories')
  const response = await categoryRepo.getAllAsync()
  categories.push(...response)

  const { id, mail } = await authStore.getAuthUserAsync()
  user.value = { id, mail }

})


</script>


<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  color: white;
  font-size: 20px;
  text-align: center;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}
</style>

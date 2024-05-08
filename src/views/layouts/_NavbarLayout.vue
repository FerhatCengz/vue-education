<template>
  <a-layout>
    <a-layout-header :trigger="null" collapsible>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal">
        <a-menu-item key="home">
          <user-outlined />
          <span>
            <router-link to="/">Home</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="about">
          <video-camera-outlined />
          <span>
            <router-link to="/about/2">About</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="test">
          <upload-outlined />
          <span>
            <router-link to="/test">Test</router-link>
          </span>
        </a-menu-item>

        <a-menu-item @click="logOut">
          <upload-outlined />
          <span>
            Log Out
          </span>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>

  <RouterView></RouterView>


</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons-vue'


const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const logOut = async () => {
  await authStore.logOut()
  await router.push({ name: 'login' })
}

const selectedKeys = ref<string[]>([route.name as string])

watch(route, () => {
  selectedKeys.value = [route.name as string]
})


</script>


<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>

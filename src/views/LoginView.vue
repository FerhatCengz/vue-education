<template>
  <section style="height: 100vh; display: flex;justify-content: center; align-items: center;">
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input placeholder="Kullanıcı Adınız" v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password placeholder="Parolanız" v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 6}">
        <a-button type="primary" html-type="submit">Giriş Yap</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '',
  password: ''
})
const onFinish = async (values: FormState) => {
  const auth = await authStore.loginAsync(values.username, values.password)
  if (auth) {
    message.success('Giriş Başarılı')
    router.push('/')


  } else {
    message.error('Giriş Başarısız')
  }

}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

onMounted(() => {
  if (router.currentRoute.value.query.auth === 'error') {
    message.error('Tekrardan Giriş Yapınız')
  }
})
</script>


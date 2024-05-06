import { defineStore } from 'pinia'
import authManager from '@/services/SupaBaseAuthManager'
import { onMounted } from 'vue'


export const useAuthStore = defineStore('auth', () => {
  const getUser = authManager.getUser()
  const loginAsync = async (username: string, password: string): Promise<boolean> => {
    return await authManager.loginAsync(username, password)
  }

  const logOut = async (): Promise<boolean> => {
    return await authManager.logoutAsync()
  }

  const isAuthAsync = async (): Promise<boolean> => {
    return await authManager.isAuthenticatedAsync()
  }

  onMounted(async () => {
    await isAuthAsync()
  })


  return {
    getUser,
    loginAsync,
    logOut,
    isAuthAsync
  }
})
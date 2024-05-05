import { defineStore } from 'pinia'
import authManager from '@/services/AuthManager'


export const useAuthStore = defineStore('auth', () => {
  const getUser = authManager.getUser()
  const loginAsync = async (username: string, password: string): Promise<boolean> => {
    return await authManager.loginAsync(username, password)
  }

  const logOut = async (): Promise<boolean> => {
    return await authManager.logoutAsync()
  }


  return {
    getUser,
    loginAsync,
    logOut
  }
})
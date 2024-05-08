import { defineStore } from 'pinia'
import authManager from '@/services/SupaBaseAuthManager'
import { onMounted } from 'vue'
import supabaseClient from '@/plugins/supaBase'
import type { IUserLogin } from '@/models/IUserLogin'
import type { IUser } from '@/models/IUser'


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

  const getAuthUserAsync = async (): Promise<IUser> => {
    const { data, error } = await supabaseClient.auth.getUser()
    if (error) {
      throw new Error(error.message)
    }
    return {
      id: data?.user?.id.toString(),
      mail: data?.user?.email
    } as IUser

  }


  return {
    getUser,
    getAuthUserAsync,
    loginAsync,
    logOut,
    isAuthAsync

  }
})
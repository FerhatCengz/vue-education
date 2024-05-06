import type { IAuthService } from './IAuthService'
import type { IUserLogin } from '@/models/IUserLogin'
import supabaseClient from '@/plugins/supaBase'
import * as console from 'console'


class SupaBaseAuthManager implements IAuthService {

  getUser(): IUserLogin | null {
    supabaseClient.auth.getUser().then((user) => {
      return user
    })
    return null
  }

  async loginAsync(username: string, password: string): Promise<boolean> {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: username,
      password: password
    })

    if (error) {
      console.error('error', error)
      return false
    }

    return data !== null
  }

  async logoutAsync(): Promise<boolean> {
    const { error } = await supabaseClient.auth.signOut()
    return !error

  }

  async isAuthenticatedAsync(): Promise<boolean> {
    const { data, error } = await supabaseClient.auth.getSession()
    return data.session !== null
  }


}

export default new SupaBaseAuthManager()
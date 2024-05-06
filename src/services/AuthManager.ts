import type { IAuthService } from './IAuthService'
import type { IUserLogin } from '@/models/IUserLogin'

const StorageKey = {
  USER: 'user',
  IS_AUTH: 'isAuth'
}


class AuthManager implements IAuthService {
  async loginAsync(username: string, password: string): Promise<boolean> {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem(StorageKey.USER, JSON.stringify({ username }))
      localStorage.setItem(StorageKey.IS_AUTH, 'true')
      return Promise.resolve(true)
    }

    return Promise.resolve(false)
  }

  async logoutAsync(): Promise<boolean> {
    localStorage.removeItem(StorageKey.USER)
    localStorage.removeItem(StorageKey.IS_AUTH)
    return Promise.resolve(true)
  }

  isAuthenticatedAsync(): Promise<boolean> {
    return Promise.resolve(localStorage.getItem(StorageKey.IS_AUTH) !== null)
  }

  getUser(): IUserLogin | null {
    return JSON.parse(localStorage.getItem(StorageKey.USER) || 'null')
  }
}

export default new AuthManager()

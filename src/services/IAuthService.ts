import type { IUserLogin } from '@/models/IUserLogin'

export interface IAuthService {

  loginAsync(username: string, password: string): Promise<boolean>;

  logoutAsync(): Promise<boolean>;

  isAuthenticatedAsync(): Promise<boolean>;

  getUser(): IUserLogin | null;

}


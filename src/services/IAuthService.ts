import type { IUserLogin } from '@/models/IUserLogin'

export interface IAuthService {

  loginAsync(username: string, password: string): Promise<boolean>;

  logoutAsync(): Promise<boolean>;

  isAuthenticated(): boolean;

  getUser(): IUserLogin | null;

}


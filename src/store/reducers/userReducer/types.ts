import { UserData } from '../../../types/types';

export interface UserState {
  user: UserData | null;
}

export interface UserPayload {
  user: UserData;
}

export const ASYNC_USER_LOGIN = 'asyncUserLogin';
export const ASYNC_USER_LOGOUT = 'asyncUserLogout';

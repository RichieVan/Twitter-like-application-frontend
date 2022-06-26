import { UserData } from '../../../types/types';

export interface UserState {
  user: UserData | null;
}

export interface UserPayload {
  user: UserData;
}

export const USER_LOGIN = 'user/asyncLogin';
export const USER_LOGOUT = 'user/asyncLogout';
export const USER_REGISTRATION = 'user/asyncRegistration';
export const USER_CHECK_AUTHORIZATION = 'user/asyncCheckAuthorization';
export const USER_UPDATE = 'user/asyncUpdate';

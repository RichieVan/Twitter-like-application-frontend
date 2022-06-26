import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLoginData, UserRegistrationData } from '../../../types/types';
import {
  USER_LOGIN,
  USER_REGISTRATION,
  USER_LOGOUT,
  USER_CHECK_AUTHORIZATION,
  UserPayload,
  UserState, USER_UPDATE,
} from './types';

const initialState: UserState = {
  user: null,
};

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserPayload>) => ({
      ...state,
      ...payload,
    }),
    clearUser: (state) => ({
      ...state,
      user: null,
    }),
  },
});

export const { setUser, clearUser } = userStore.actions;
export const asyncUserLogin = (payload: UserLoginData): PayloadAction<UserLoginData> => ({
  type: USER_LOGIN,
  payload,
});

export const asyncUserLogout = (): Action => ({
  type: USER_LOGOUT,
});

export const asyncUserRegistration = (
  payload: UserRegistrationData,
): PayloadAction<UserRegistrationData> => ({
  type: USER_REGISTRATION,
  payload,
});

export const asyncCheckAuthorization = (): Action => ({
  type: USER_CHECK_AUTHORIZATION,
});

export const asyncUserUpdate = (): Action => ({
  type: USER_UPDATE,
});

export default userStore.reducer;

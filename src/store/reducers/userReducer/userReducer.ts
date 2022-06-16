import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLoginData } from '../../../types/types';
import {
  ASYNC_USER_LOGIN, ASYNC_USER_LOGOUT, UserPayload, UserState,
} from './types';

const initialState: UserState = {
  user: null,
};

const userReducer = createSlice({
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

export const { setUser, clearUser } = userReducer.actions;
export const asyncUserLogin = (loginData: UserLoginData): PayloadAction<UserLoginData> => ({
  type: ASYNC_USER_LOGIN,
  payload: loginData,
});
export const asyncUserLogout = (): Action => ({
  type: ASYNC_USER_LOGOUT,
});

export default userReducer.reducer;

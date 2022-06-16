import {
  takeLeading,
  call,
  put,
  all,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { UserDataWithTokens, UserLoginData } from '../types/types';
import { clearUser, setUser } from '../store/reducers/userReducer/userReducer';
import UserService from '../services/UserService';
import ErrorHelper from '../helpers/ErrorHelper';
import { ASYNC_USER_LOGIN, ASYNC_USER_LOGOUT } from '../store/reducers/userReducer/types';
import TokenService from '../services/TokenService';

function* userLoginWorker({ payload: loginData }: PayloadAction<UserLoginData>) {
  try {
    const {
      data: { user, accessToken },
    }: AxiosResponse<UserDataWithTokens> = yield call(UserService.login, loginData);
    TokenService.setAccessToken(accessToken);
    yield put(setUser({ user }));
  } catch (e) {
    ErrorHelper.handleApiError(e);
  }
}

function* userLogoutWorker() {
  try {
    yield call(UserService.logout);
    TokenService.clearAccessToken();
    yield put(clearUser());
  } catch (e) {
    ErrorHelper.handleApiError(e);
  }
}

function* loginFlow() {
  yield takeLeading(ASYNC_USER_LOGIN, userLoginWorker);
  yield takeLeading(ASYNC_USER_LOGOUT, userLogoutWorker);
}

export default function* userWatcher() {
  yield all([loginFlow()]);
}

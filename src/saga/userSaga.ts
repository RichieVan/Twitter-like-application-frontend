import {
  takeLeading,
  call,
  put,
  all,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import {
  ApiErrorData,
  UserDataWithTokens,
  UserLoginData,
  UserRegistrationData,
  UserUpdateData,
} from '../types/types';
import { clearUser, setUser } from '../store/reducers/userReducer/userReducer';
import UserService from '../services/UserService';
import ErrorHelper from '../helpers/ErrorHelper';
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTRATION,
  USER_UPDATE,
} from '../store/reducers/userReducer/types';
import TokenService from '../services/TokenService';
import { setLoginErrors, setRegistrationErrors } from '../store/reducers/formReducer/formReducer';
import isAxiosError from '../guards/isAxiosError';
import { API_URL } from '../http';

function* setTokensAndUserData({ user, accessToken }: UserDataWithTokens) {
  TokenService.setAccessToken(accessToken);
  yield put(setUser({ user }));
}

function* login({ payload }: PayloadAction<UserLoginData>) {
  try {
    const { data }: Awaited<ReturnType<typeof UserService.login>> = yield call(
      UserService.login,
      payload,
    );

    yield setTokensAndUserData(data);
  } catch (e) {
    if (isAxiosError<ApiErrorData>(e) && e.response) {
      const { message, errors } = e.response.data;
      yield put(setLoginErrors([message, ...errors]));
    } else {
      ErrorHelper.handleUnexpectedError();
    }
  }
}

function* registration({ payload }: PayloadAction<UserRegistrationData>) {
  try {
    const { data }: Awaited<ReturnType<typeof UserService.registration>> = yield call(
      UserService.registration,
      payload,
    );

    yield setTokensAndUserData(data);
  } catch (e) {
    if (isAxiosError<ApiErrorData>(e) && e.response) {
      const { message, errors } = e.response.data;
      yield put(setRegistrationErrors([message, ...errors]));
    } else {
      ErrorHelper.handleUnexpectedError();
    }
  }
}

function* logout() {
  try {
    yield call(UserService.logout);
    TokenService.clearAccessToken();
    yield put(clearUser());
  } catch (e) {
    ErrorHelper.handleApiError(e);
  }
}

function* updateData({ payload }: PayloadAction<UserUpdateData>) {
  const { data }: Awaited<ReturnType<typeof UserService.updateUser>> = yield call(
    UserService.updateUser,
    payload,
  );
  yield setTokensAndUserData(data);
}

export function* checkAuthorization() {
  try {
    const { data }: AxiosResponse<UserDataWithTokens> = yield call(
      axios.get,
      `${API_URL}/refresh`,
      { withCredentials: true },
    );

    yield setTokensAndUserData(data);
  } catch (e) {
    TokenService.clearAccessToken();
  }
}

function* loginFlow() {
  yield takeLeading(USER_LOGIN, login);
  yield takeLeading(USER_LOGOUT, logout);
  yield takeLeading(USER_REGISTRATION, registration);
  yield takeLeading(USER_UPDATE, updateData);
}

export default function* userWatcher() {
  yield all([loginFlow()]);
}

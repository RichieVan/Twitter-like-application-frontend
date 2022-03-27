import { makeAutoObservable } from 'mobx';
import axios, { AxiosResponse } from 'axios';

import UserService from '../services/UserService';
import { API_URL } from '../http/index';
import {
  ExtendedUserData,
  IUserStore,
  ProfileStatsData,
  SubsCountObject,
  UserData,
  UserDataWithTokens,
  UserLoginData,
  UserRegistrationData,
  UserUpdateData,
} from '../types/types';

export default class UserStore implements IUserStore {
  user: UserData | null = null;

  isAuth: boolean = false;

  // notificationStore;

  constructor() {
    // this.notificationStore = notificationStore;
    makeAutoObservable(this);
  }

  setAuth(state: boolean) {
    this.isAuth = state;
  }

  setUser(state: UserData | null) {
    this.user = state;
  }

  setTokensAndUser(data: UserDataWithTokens) {
    localStorage.setItem('accessToken', data.accessToken);
    this.setAuth(true);
    this.setUser(data.user);
  }

  async login(loginData: UserLoginData): Promise<void> {
    try {
      const { data } = await UserService.login(loginData);
      this.setTokensAndUser(data);

      // this.notificationStore.show('Вы были успешно авторизованы', 4000, 'success');
    } catch (e) {
      // this.notificationStore.show(e.response.data.message, 8000, 'error');
      // throw Error(e.response.data.message);
    }
  }

  async registration(registrationData: UserRegistrationData): Promise<void> {
    try {
      const { data } = await UserService.registration(registrationData);
      localStorage.setItem('accessToken', data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    } catch (e) {
      // let timeout = 0;
      // e.response.data.errors.forEach((value) => {
      //   setTimeout(() => {
      //     // this.notificationStore.show(value, 8000, 'error');
      //   }, timeout);
      //   timeout += 200;
      // });
      // throw Error('Ошибка валидации');
    }
  }

  async logout(): Promise<void> {
    try {
      await UserService.logout();
      localStorage.removeItem('accessToken');
      this.setAuth(false);
      this.setUser(null);
    } catch (e) {
      // console.log(e.response.data.message);
    }
  }

  async updateUser(updatedData: UserUpdateData): Promise<void> {
    try {
      const { data } = await UserService.updateUser(updatedData);
      this.setTokensAndUser(data);

      // this.notificationStore.show('Информация обновлена', 4000, 'success');
    } catch (e) {
      // this.notificationStore.show(e.response.data.message, 4000, 'error');
    }
  }

  // async updateAvatar(avatarData) {
  //   try {
  //     const response = await UserService.updateAvatar(avatarData);
  //     this.setTokensAndUser(response);
  //   } catch (e) {
  //     return e;
  //   }
  // }

  async sendNewActivationMail(): Promise<Date> {
    const { data } = await UserService.sendNewActivationMail();
    return data;
  }

  async getActivationMailCooldown(): Promise<Date | null> {
    const { data } = await UserService.getActivationMailCooldown();
    return data;
  }

  async checkAuthorization(): Promise<void> {
    try {
      const { data } = await axios.get(
        `${API_URL}/refresh`,
        { withCredentials: true },
      ) as AxiosResponse<UserDataWithTokens>;

      localStorage.setItem('accessToken', data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    } catch (e) {
      localStorage.removeItem('accessToken');
    }
  }

  async subscribeToUser(id: number): Promise<SubsCountObject | undefined> {
    try {
      const { data } = await UserService.subscribeToUser(id);
      return data;
    } catch (e) {
      // return e;
    }
  }

  async unsubscribeFromUser(id: number): Promise<SubsCountObject | undefined> {
    try {
      const { data } = await UserService.unsubscribeFromUser(id);
      return data;
    } catch (e) {
      // return e;
    }
  }

  async getUserData(login: string): Promise<ExtendedUserData> {
    const { data } = await UserService.getUserData(login);
    console.log(data);
    return data;
  }

  async getProfileStats(userId: number): Promise<ProfileStatsData> {
    const { data } = await UserService.getProfileStats(userId);
    return data;
  }
}

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
import ErrorHelper from '../helpers/ErrorHelper';

export default class UserStore implements IUserStore {
  user: UserData | null = null;

  isAuth: boolean = false;

  constructor() {
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
    } catch (e) {
      ErrorHelper.handleApiError(e);
    }
  }

  async registration(registrationData: UserRegistrationData): Promise<void> {
    try {
      const { data } = await UserService.registration(registrationData);
      localStorage.setItem('accessToken', data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    } catch (e) {
      ErrorHelper.handleApiError(e);
    }
  }

  async logout(): Promise<void> {
    try {
      await UserService.logout();
      localStorage.removeItem('accessToken');
      this.setAuth(false);
      this.setUser(null);
    } catch (e) {
      ErrorHelper.handleUnexpectedError();
    }
  }

  async updateUser(updatedData: UserUpdateData): Promise<void> {
    try {
      const { data } = await UserService.updateUser(updatedData);
      this.setTokensAndUser(data);
    } catch (e) {
      ErrorHelper.handleApiError(e);
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
    const { data } = await UserService.subscribeToUser(id);
    return data;
  }

  async unsubscribeFromUser(id: number): Promise<SubsCountObject | undefined> {
    const { data } = await UserService.unsubscribeFromUser(id);
    return data;
  }

  async getUserData(login: string): Promise<ExtendedUserData> {
    const { data } = await UserService.getUserData(login);
    return data;
  }

  async getProfileStats(userId: number): Promise<ProfileStatsData> {
    const { data } = await UserService.getProfileStats(userId);
    return data;
  }
}

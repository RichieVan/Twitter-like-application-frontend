import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import React from 'react';

import UserService from '../services/UserService';
import { API_URL } from '../http/index';
import ActivateAccountPopup from '../components/ActivateAccountPopup/ActivateAccountPopup';

export default class UserStore {
  user = {};

  isAuth = false;

  modalStore;

  notificationStore;

  constructor(modalStore, notificationStore) {
    this.modalStore = modalStore;
    this.notificationStore = notificationStore;
    makeAutoObservable(this);
  }

  setAuth(state) {
    this.isAuth = state;
  }

  setUser(state) {
    this.user = state;
  }

  setTokensAndUser(response) {
    localStorage.setItem('accessToken', response.data.accessToken);
    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async login(loginOrEmail, password) {
    try {
      const response = await UserService.login(loginOrEmail, password);
      this.setTokensAndUser(response);

      this.notificationStore.show('Вы были успешно авторизованы', 4000, 'success');
    } catch (e) {
      this.notificationStore.show(e.response.data.message, 8000, 'error');
      throw Error(e.response.data.message);
    }
  }

  async registration(data) {
    try {
      const response = await UserService.registration(data);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);

      this.notificationStore.show('Вы были успешно авторизованы', 4000, 'success');

      this.modalStore.openModal(<ActivateAccountPopup />, {
        heading: 'Активация аккаунта',
      });
    } catch (e) {
      let timeout = 0;
      e.response.data.errors.forEach((value) => {
        setTimeout(() => {
          this.notificationStore.show(value, 8000, 'error');
        }, timeout);
        timeout += 200;
      });
      throw Error('Ошибка валидации');
    }
  }

  async logout() {
    try {
      await UserService.logout();
      localStorage.removeItem('accessToken');
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async updateUser(data) {
    try {
      const response = await UserService.updateUser(data);
      this.setTokensAndUser(response);

      this.notificationStore.show('Информация обновлена', 4000, 'success');
    } catch (e) {
      this.notificationStore.show(e.response.data.message, 4000, 'error');
    }
  }

  async updateAvatar(link) {
    try {
      const response = await UserService.updateAvatar(link);
      this.setTokensAndUser(response);
    } catch (e) {
      return e;
    }
  }

  async sendNewActivationMail() {
    try {
      const response = await UserService.sendNewActivationMail();
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async getActivationMailCooldown() {
    try {
      const response = await UserService.getActivationMailCooldown();
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async checkAuthorization() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
      console.log(response);

      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      localStorage.removeItem('accessToken');
    }
  }

  async subscribeToUser(id) {
    try {
      const response = await UserService.subscribeToUser(id);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async unsubscribeFromUser(id) {
    try {
      const response = await UserService.unsubscribeFromUser(id);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async getUserData(username) {
    try {
      const { data } = await UserService.getUserData(username);
      return data;
    } catch (e) {
      return e;
    }
  }

  async getProfileStats(id) {
    try {
      const { data } = await UserService.getProfileStats(id);
      return data;
    } catch (e) {
      return e;
    }
  }
}

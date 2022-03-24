import api from '../http';
import {
  UserRegistrationData,
  UserDataWithTokens,
  ExtendedUserData,
  ProfileStats,
  SubsCountObject,
  UserUpdateData,
  UserLoginData,
  RequestPromise,
} from '../types/types';

class UserService {
  static async login(loginData: UserLoginData): RequestPromise<UserDataWithTokens> {
    return api.post('/login', loginData);
  }

  static async registration(
    registrationData: UserRegistrationData,
  ): RequestPromise<UserDataWithTokens> {
    return api.post('/register', registrationData);
  }

  static async logout(): Promise<void> {
    api.post('/logout');
  }

  // static async updateAvatar(data) {
  //   return api.put('/avatar', { data });
  // }

  static async sendNewActivationMail(): RequestPromise<Date> {
    return api.post('/sendmail');
  }

  static async getActivationMailCooldown(): RequestPromise<Date | null> {
    return api.get('/sendmail');
  }

  static async updateUser(data: UserUpdateData): RequestPromise<UserDataWithTokens> {
    return api.put('/user', data);
  }

  static async subscribeToUser(id: number): RequestPromise<SubsCountObject> {
    return api.post('/user/subscribe', { id });
  }

  static async unsubscribeFromUser(id: number): RequestPromise<SubsCountObject> {
    return api.post('/user/unsubscribe', { id });
  }

  static async getUserData(username: string): RequestPromise<ExtendedUserData> {
    return api.get('/user', {
      params: { username },
    });
  }

  static async getProfileStats(id: number): RequestPromise<ProfileStats> {
    return api.get(`/user/${id}/stats`);
  }
}

export default UserService;

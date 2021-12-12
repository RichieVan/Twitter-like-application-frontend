import api from "../http";

export default class UserService {
    static async login (loginOrEmail, password) {
        return api.post('/login', {loginOrEmail, password});
    }

    static async registration (data) {
        return api.post('/register', data);    
    }

    static async logout () {
        return api.post('/logout');
    }

    static async updateAvatar (data) {
        return api.put('/avatar', {data});
    }

    static async sendNewActivationMail () {
        return api.post('/sendmail');
    }

    static async getActivationMailCooldown () {
        return api.get('/sendmail');
    }

    static async getUserData (username) {
        return api.get('/user', {
            params : {username}
        });
    }

    static async getProfileStats (id) {
        return api.get(`/user/${id}/stats`);
    }

    static async subscribeToUser (id) {
        return api.post(`/user/subscribe`, {id});
    }

    static async unsubscribeFromUser (id) {
        return api.post(`/user/unsubscribe`, {id});
    }

    static async updateUser (data) {
        return api.put('/user', data);
    }
}

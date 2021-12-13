import { makeAutoObservable } from "mobx";

export default class AppStore {
    isFirstLoading = true;
    isGlobalLoading = false;
    // apiUrl = 'http://localhost:8101';
    // appUrl = 'http://localhost:8000';
    apiUrl = 'https://rvbackend.herokuapp.com/';
    appUrl = 'https://rvfront.herokuapp.com/';
    activePostOptions = null;
    userStore;

    aliases = {
        static : '/assets'
    }

    constructor(UserStore) {
        this.userStore = UserStore;
        makeAutoObservable(this);
    }

    setFirstLoading (state) {
        this.isFirstLoading = state;
    }

    setGlobalLoading (state) {
        this.isGlobalLoading = state;
    }

    setActivePostOptions (state) {
        this.activePostOptions = state;
    }

    async preloader () {
        if (localStorage.getItem('accessToken')) {
            await this.userStore.checkAuthorization();
        }

        document.addEventListener('click', (e) => {
            if (this.activePostOptions !== null) {
                this.setActivePostOptions(null)
            }
        })

        this.setFirstLoading(false);
    }
}
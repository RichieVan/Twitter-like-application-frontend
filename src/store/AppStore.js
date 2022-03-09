import { makeAutoObservable } from 'mobx';

export default class AppStore {
  isFirstLoading = true;

  isGlobalLoading = false;

  activePostOptions = null;

  userStore;

  aliases = {
    static: '/assets',
  };

  constructor(UserStore) {
    this.userStore = UserStore;
    makeAutoObservable(this);
  }

  setFirstLoading(state) {
    this.isFirstLoading = state;
  }

  setGlobalLoading(state) {
    this.isGlobalLoading = state;
  }

  setActivePostOptions(state) {
    this.activePostOptions = state;
  }

  async preloader() {
    if (localStorage.getItem('accessToken')) {
      await this.userStore.checkAuthorization();
    }

    document.addEventListener('click', () => {
      if (this.activePostOptions !== null) {
        this.setActivePostOptions(null);
      }
    });

    this.setFirstLoading(false);
  }
}

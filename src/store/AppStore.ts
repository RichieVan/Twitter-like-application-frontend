import { makeAutoObservable } from 'mobx';
import {
  ActivePostOptions,
  AppStoreAliases,
  IAppStore,
  IUserStore,
} from '../types/types';

class AppStore implements IAppStore {
  isFirstLoading: boolean = true;

  isGlobalLoading: boolean = false;

  activePostOptions: ActivePostOptions | null = null;

  userStore: IUserStore;

  aliases: AppStoreAliases = {
    static: '/assets',
  };

  constructor(UserStore: IUserStore) {
    this.userStore = UserStore;
    makeAutoObservable(this);
  }

  setFirstLoading(state: boolean): void {
    this.isFirstLoading = state;
  }

  setGlobalLoading(state: boolean): void {
    this.isGlobalLoading = state;
  }

  setActivePostOptions(state: { id: number; type: any; } | null): void {
    this.activePostOptions = state;
  }

  async preloader(): Promise<void> {
    this.setGlobalLoading(true);

    if (localStorage.getItem('accessToken')) {
      await this.userStore.checkAuthorization();
    }

    document.addEventListener('click', () => {
      if (this.activePostOptions !== null) {
        this.setActivePostOptions(null);
      }
    });

    this.setFirstLoading(false);
    this.setGlobalLoading(false);
  }
}

export default AppStore;

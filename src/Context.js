import { createContext } from 'react';

import AppStore from './store/AppStore';
import ModalStore from './store/ModalStore';
import NotificationStore from './store/NotificationStore';
import UrlStore from './store/UrlStore';
import UserStore from './store/UserStore';
import PostStore from './store/PostStore';

const modalStore = new ModalStore();
const notificationStore = new NotificationStore();
const urlStore = new UrlStore(notificationStore);
const userStore = new UserStore();
const appStore = new AppStore(userStore);
const postStore = new PostStore();

const storeList = {
  appStore,
  userStore,
  modalStore,
  notificationStore,
  urlStore,
  postStore,
};

const Context = createContext(storeList);

export { Context, storeList };

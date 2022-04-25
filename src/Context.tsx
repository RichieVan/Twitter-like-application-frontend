import { createContext } from 'react';

import AppStore from './stores/AppStore';
import ModalStore from './stores/ModalStore';
import NotificationStore from './stores/NotificationStore';
import UserStore from './stores/UserStore';
import PostStore from './stores/PostStore';

const modalStore = new ModalStore();
const notificationStore = new NotificationStore();
const userStore = new UserStore();
const appStore = new AppStore(userStore);
const postStore = new PostStore();

const storeList = {
  appStore,
  userStore,
  modalStore,
  notificationStore,
  postStore,
};

const Context = createContext(storeList);

export { Context, storeList };

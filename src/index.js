import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import AppStore from "./store/AppStore";
import ModalStore from "./store/ModalStore";
import NotificationStore from "./store/NotificationStore";
import UrlStore from "./store/UrlStore";
import UserStore from "./store/UserStore";
import PostStore from "./store/PostStore";

const modalStore = new ModalStore();
const notificationStore = new NotificationStore();
const urlStore = new UrlStore(notificationStore);
const userStore = new UserStore(modalStore, notificationStore);
const appStore = new AppStore(userStore);
const postStore = new PostStore();

const storeList = {
  appStore,
  userStore,
  modalStore,
  notificationStore,
  urlStore,
  postStore
}

export const Context = createContext(storeList)

const application = (
  <Context.Provider value={storeList}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);

ReactDOM.render(
  application,
  document.getElementById('root')
);
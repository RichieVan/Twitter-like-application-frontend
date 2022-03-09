import React from 'react';
import { makeAutoObservable } from 'mobx';

export default class UrlStore {
  notificationStore;

  params = {};

  hashes = [];

  constructor(notificationStore) {
    this.notificationStore = notificationStore;
    makeAutoObservable(this);
  }

  parseUrl() {
    const url = new URL(window.location.href);
    const params = {};
    const paramsKeys = [];

    if (url.search) {
      url.search.substring(1).split('&').forEach((value, index, array) => {
        const param = value.split('=');
        paramsKeys.push(param[0]);

        Object.assign(params, {
          [param[0]]: param[1],
        });
      });
    }

    // console.log(params);
    // console.log(paramsKeys);
    // console.log(url.search);
    // console.log(url);

    if (paramsKeys.includes('activate')) {
      if (params.activate == 'true') {
        this.notificationStore.show('Аккаунт успешно активирован', 3000, 'success');
      } else {
        this.notificationStore.show('Неверная ссылка активации', 3000, 'error');
      }
      url.searchParams.delete('activate');
    }

    // history.pushState(null, null, url.href);
    // console.log(decodeURI(url));
  }
}

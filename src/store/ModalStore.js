import React from 'react';
import {
  makeObservable,
  observable,
  action,
  toJS,
  runInAction,
} from 'mobx';

export default class ModalStore {
  namesList = [];

  active = [];

  fading = [];

  modals = [];

  constructor() {
    makeObservable(
      this,
      {
        namesList: observable,
        modals: observable,
        active: observable,
        setModalActive: action,
        openModal: action,
        addModal: action,
      },
      { deep: true },
    );
  }

  openModal(element, options = {}) {
    const modalName = element.type.name;
    if (!this.namesList.includes(modalName)) {
      this.addModal(element, options);
      return;
    }

    if (!this.active.includes(modalName)) {
      this.active = this.active.concat([modalName]);
    }
  }

  addModal(element, options) {
    const modalName = element.type.name;

    this.active = this.active.concat([modalName]);
    this.modals = this.modals.concat([{
      element,
      props: {
        modalName,
        heading: (options?.heading || ''),
        fadingOutTime: (options?.fadingOutTime || null),
        temporal: (options?.temporal || false),
      },
    }]);
    this.namesList.push(element.type.name);
  }

  deleteFromModalsList(modalName) {
    runInAction(() => {
      this.modals = toJS(this.modals).filter((value) => value.props.modalName !== modalName);
    });
  }

  deleteFromNamesList(modalName) {
    this.namesList.splice(this.namesList.indexOf(modalName), 1);
  }

  setModalActive(modalName, value) {
    if (value) this.active = this.active.concat([modalName]);
    else this.active.splice(this.active.indexOf(modalName), 1);
  }

  setModalFading(modalName, value) {
    if (value) this.fading = this.fading.concat([modalName]);
    else this.fading.splice(this.fading.indexOf(modalName), 1);
  }

  setBodyUnscrollable(value) {
    if (value) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }
}

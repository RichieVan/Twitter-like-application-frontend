import {
  makeObservable,
  observable,
  action,
  toJS,
  runInAction,
} from 'mobx';
import { IModalStore, ModalData, ModalOptions } from '../types/types';

class ModalStore implements IModalStore {
  namesList: string[] = [];

  active: string[] = [];

  modals: ModalData[] = [];

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

  openModal(element: JSX.Element, options: ModalOptions): void {
    const modalName = element.type.name;
    if (!this.namesList.includes(modalName)) {
      this.addModal(element, options);
      return;
    }

    if (!this.active.includes(modalName)) {
      this.active = this.active.concat([modalName]);
    }
  }

  addModal(element: JSX.Element, options: ModalOptions): void {
    const modalName = element.type.name;

    this.active = this.active.concat([modalName]);
    this.modals = this.modals.concat([{
      element,
      props: {
        modalName,
        heading: options?.heading || '',
        temporal: options?.temporal || false,
        // fadingOutTime: (options?.fadingOutTime || null),
      },
    }]);
    this.namesList.push(element.type.name);
  }

  deleteFromModalsList(modalName: string): void {
    runInAction(() => {
      this.modals = toJS(this.modals).filter((value) => value.props.modalName !== modalName);
    });
  }

  deleteFromNamesList(modalName: string): void {
    this.namesList.splice(this.namesList.indexOf(modalName), 1);
  }

  setModalActive(modalName: string, value: boolean): void {
    if (value) this.active = this.active.concat([modalName]);
    else this.active.splice(this.active.indexOf(modalName), 1);
  }

  // setModalFading(modalName, value) {
  //   if (value) this.fading = this.fading.concat([modalName]);
  //   else this.fading.splice(this.fading.indexOf(modalName), 1);
  // }

  setBodyUnscrollable(value: boolean): void {
    if (value) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }
}

export default ModalStore;

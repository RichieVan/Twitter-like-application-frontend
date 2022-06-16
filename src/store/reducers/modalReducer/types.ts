import { ModalData, ModalOptions } from '../../../types/types';

export interface ModalState {
  namesList: string[];
  active: string[];
  modals: ModalData[];
}

export interface OpenModalPayload {
  element: JSX.Element;
  options: ModalOptions;
}

export interface ToggleModalPayload {
  modalName: string;
  toggleState: boolean;
}

export interface RemoveModalPayload {
  modalName: string;
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ModalState, OpenModalPayload, RemoveModalPayload, ToggleModalPayload,
} from './types';
import { ModalData } from '../../../types/types';

const initialState: ModalState = {
  namesList: [],
  active: [],
  modals: [],
};

const modalNameFilter = (namesArray: string[], modalName: string) => (
  namesArray.filter((arrayItem: string) => arrayItem !== modalName)
);

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      {
        payload: { element, options },
      }: PayloadAction<OpenModalPayload>,
    ) => {
      const modalName = element.type.name;
      if (!state.namesList.includes(modalName)) {
        const modalData: ModalData = {
          element,
          props: {
            modalName,
            heading: options?.heading || '',
            temporal: options?.temporal || false,
          },
        };

        return {
          ...state,
          namesList: state.namesList.concat([modalName]),
          active: state.active.concat([modalName]),
          modals: state.modals.concat([modalData]),
        };
      }

      if (state.active.includes(modalName)) {
        return {
          ...state,
          active: state.active.concat([modalName]),
        };
      }

      return state;
    },
    toggleModal: (
      state,
      {
        payload: { modalName, toggleState },
      }: PayloadAction<ToggleModalPayload>,
    ) => {
      const updatedActiveList = toggleState
        ? state.active.concat([modalName])
        : state.active.filter((activeModalName) => activeModalName !== modalName);

      return {
        ...state,
        active: updatedActiveList,
      };
    },
    removeModal: (
      state,
      {
        payload: { modalName },
      }: PayloadAction<RemoveModalPayload>,
    ) => {
      const { namesList, active, modals } = state;

      return {
        ...state,
        namesList: modalNameFilter(namesList, modalName),
        active: modalNameFilter(active, modalName),
        modals: modals.filter((modal) => modal.props.modalName !== modalName),
      };
    },
  },
});

export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;

import { observer } from 'mobx-react-lite';
import React, { cloneElement, useContext, FC } from 'react';

import { Context } from '../../Context';
import getClassList from '../../lib/getClassList';
import ModalBase from './base/ModalBase';
import { IModalProps, ModalCloseFunction } from './types';

const Modal: FC<IModalProps> = ({
  modalName,
  heading = '',
  temporal = false,
  children,
}) => {
  const { modalStore } = useContext(Context);
  const classList = getClassList('modal', modalStore.active.includes(modalName) ? ['active'] : []);

  let closeModal: ModalCloseFunction;
  if (temporal) {
    closeModal = () => {
      modalStore.setModalActive(modalName, false);
      modalStore.deleteFromModalsList(modalName);
      modalStore.deleteFromNamesList(modalName);
    };
  } else {
    closeModal = () => {
      modalStore.setModalActive(modalName, false);
    };
  }

  return (
    <div
      className={classList}
      role="presentation"
      onClick={() => closeModal()}
    >
      <ModalBase
        heading={heading}
        containerClickHandler={(e) => e.stopPropagation()}
        closeModalHandler={() => closeModal()}
      >
        {React.isValidElement(children) && (
          cloneElement(
            children,
            {
              closeModal,
            },
          )
        )}
      </ModalBase>
    </div>
  );
};

export default observer(Modal);

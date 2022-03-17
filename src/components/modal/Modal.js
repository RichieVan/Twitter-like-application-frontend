import { observer } from 'mobx-react-lite';
import React, { cloneElement, useContext } from 'react';
import { Context } from '../../Context';

import ModalBase from './base/ModalBase';

function Modal({
  modalName,
  heading,
  temporal,
  children,
}) {
  const { modalStore } = useContext(Context);

  const classArray = ['modal'];
  if (modalStore.active.includes(modalName)) classArray.push('modal_active');
  const classList = classArray.join(' ');

  let closeModal;
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
      onClick={() => closeModal()}
    >
      <ModalBase
        heading={heading}
        containerClickHandler={(e) => e.stopPropagation()}
        closeModalHandler={() => closeModal()}
      >
        {cloneElement(children, {
          closeModal,
        })}
      </ModalBase>
    </div>
  );
}

export default observer(Modal);

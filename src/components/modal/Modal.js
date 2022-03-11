import { observer } from 'mobx-react-lite';
import React, { cloneElement, useContext, useState } from 'react';
import { Context } from '../..';

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

  let closeFunction;
  if (temporal) {
    closeFunction = () => {
      modalStore.setModalActive(modalName, false);
      modalStore.deleteFromModalsList(modalName);
      modalStore.deleteFromNamesList(modalName);
    };
  } else {
    closeFunction = () => {
      modalStore.setModalActive(modalName, false);
    };
  }

  return (
    <div
      className={classList}
      onClick={() => closeFunction()}
    >
      <ModalBase
        heading={heading}
        containerClickHandler={(e) => e.stopPropagation()}
        closeModalHandler={() => closeFunction()}
      >
        {cloneElement(children, {
          closeFunction,
        })}
      </ModalBase>
    </div>
  );
}

export default observer(Modal);

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import './style.css';
import { Context } from '../..';
import Modal from './Modal';

function ModalsList() {
  const { modalStore } = useContext(Context);

  return (
    <div className="modals">
      {modalStore.modals.map((value) => (
        <Modal
          key={value.props.modalName}
          {...value.props}
        >
          {value.element}
        </Modal>
      ))}
    </div>
  );
}

export default observer(ModalsList);

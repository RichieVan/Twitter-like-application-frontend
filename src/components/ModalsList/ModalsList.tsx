import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';

import { Context } from '../../Context';
import Modal from '../Modal/Modal';

const ModalsList: FC = () => {
  const { modalStore } = useContext(Context);

  const modals = modalStore.modals.map((value) => {
    const { modalName, heading, temporal } = value.props;
    return (
      <Modal
        key={value.props.modalName}
        modalName={modalName}
        heading={heading}
        temporal={temporal}
      >
        {value.element}
      </Modal>
    );
  });

  return (
    <div className="modals">
      {modals}
    </div>
  );
};

export default observer(ModalsList);

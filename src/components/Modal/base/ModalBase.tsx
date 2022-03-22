import React, { FC } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IModalBaseProps } from '../types';

const ModalBase: FC<IModalBaseProps> = ({
  heading = '',
  containerClickHandler,
  closeModalHandler,
  children,
}) => (
  <div
    className="modal__container"
    role="presentation"
    onClick={(e) => containerClickHandler(e)}
  >
    <h2 className="modal__heading">{heading}</h2>
    <div className="modal__content">
      {children}
    </div>
    <button
      type="button"
      className="modal__close"
      onClick={(e) => closeModalHandler(e)}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  </div>
);

export default ModalBase;

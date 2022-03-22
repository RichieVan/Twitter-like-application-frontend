import React, { FC } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IModalPostBaseProps } from '../types';

const ModalPostBase: FC<IModalPostBaseProps> = ({
  containerClickHandler,
  closeModalHandler,
  children,
}) => (
  <div className="modal__fix">
    <div className="modal__inner-container modal__inner-container_type_post container">
      <div className="row">
        <div className="col-6 mx-auto">
          <div
            className="modal__container"
            role="presentation"
            onClick={(e) => containerClickHandler(e)}
          >
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
        </div>
      </div>
    </div>
  </div>
);

export default ModalPostBase;

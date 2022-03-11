import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ModalPostBase({
  containerClickHandler,
  closeModalHandler,
  children,
}) {
  return (
    <div className="modal__fix no-pi">
      <div className="modal__inner-container modal__inner-container_type_post container no-pi">
        <div className="row">
          <div className="col-6 mx-auto pi">
            <div
              className="modal__container"
              onClick={(e) => containerClickHandler(e)}
            >
              <div className="modal__content">
                {children}
              </div>
              <div
                className="modal__close" 
                onClick={(e) => closeModalHandler(e)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPostBase;

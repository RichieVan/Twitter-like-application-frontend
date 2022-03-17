import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ModalBase({
  heading,
  containerClickHandler,
  closeModalHandler,
  children,
}) {
  return (
    <div 
      className="modal__container" 
      onClick={(e) => containerClickHandler(e)}
    >
      <h2 className="modal__heading">{heading}</h2>
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
  );
}

export default ModalBase;

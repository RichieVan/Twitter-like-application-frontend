import React, { useState } from 'react';
import LoadingMask from '../LoadingMask/LoadingMask';
import Button from '../Button/Button';

function ConfirmPopup({
  closeModal,
  text,
  confirmText,
  declineText,
  confirmAction,
  confirmButtonMods = [],
}) {
  const [isLoading, setIsLoading] = useState(false);

  let renderText;
  if (typeof text !== 'string' && text.length > 0) {
    renderText = text.map((value, index) => (<div key={index}>{value}</div>));
  } else {
    renderText = text;
  }

  const confirmClickHandler = () => {
    setIsLoading(true);
    confirmAction()
      .then(() => {
        closeModal();
      });
  };

  return (
    <div className="confirm-popup">
      {isLoading && (
        <LoadingMask cHeight={50} cWidth={50} bg="inherit" opacity={0.8} />
      )}
      <div className="text">
        {renderText}
      </div>
      <div className="buttons-container">
        <Button
          clickHandler={closeModal}
        >
          {declineText}
        </Button>
        <Button
          mods={confirmButtonMods}
          clickHandler={confirmClickHandler}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmPopup;

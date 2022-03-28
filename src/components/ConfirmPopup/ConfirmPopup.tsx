import React, { FC, useState } from 'react';
import LoadingMask from '../LoadingMask/LoadingMask';
import Button from '../Button/Button';
import { ConfirmPopupProps } from './types';

const ConfirmPopup: FC<ConfirmPopupProps> = ({
  closeModal,
  text,
  confirmText,
  declineText,
  confirmAction,
  confirmButtonMods = [],
}) => {
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
        if (closeModal) closeModal();
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
          onClick={() => {
            if (closeModal) closeModal();
          }}
        >
          {declineText}
        </Button>
        <Button
          mods={confirmButtonMods}
          onClick={confirmClickHandler}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPopup;

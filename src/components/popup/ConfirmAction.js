import React, { useState } from 'react';
import LoadingMask from '../LoadingMask';

function ConfirmAction({
  closeModal,
  text,
  confirmText,
  declineText,
  confirmAction,
  confirmButtonStyles = '',
}) {
  const [isLoading, setIsLoading] = useState(false);

  let renderText;
  if (typeof text !== 'string' && text.length > 0) {
    renderText = text.map((value, index) => (<div key={index}>{value}</div>));
  } else {
    renderText = text;
  }

  return (
    <div className="confirm-action_container">
      {isLoading && (
        <LoadingMask cHeight={50} cWidth={50} bg="inherit" opacity={0.8} />
      )}
      <div className="text">
        {renderText}
      </div>
      <div className="buttons-container">
        <button
          type="button"
          className="btn"
          onClick={() => {
            closeModal();
          }}
        >
          {declineText}
        </button>
        <button
          type="button"
          className={`btn ${confirmButtonStyles}`}
          onClick={() => {
            setIsLoading(true);
            confirmAction()
              .then(() => {
                closeModal();
              });
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export default ConfirmAction;

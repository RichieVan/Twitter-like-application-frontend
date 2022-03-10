import React, { useState } from 'react';
import LoadingMask from '../LoadingMask';

function LoadMoreButton({ action }) {
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = () => {
    setIsLoading(true);
    action()
      .then(() => setIsLoading(false))
      .catch((callback) => callback());
  };

  return (
    <div className="load-more">
      <button
        type="button"
        className="load-more__button"
        onClick={() => clickHandler()}
      >
        Загрузить еще
      </button>
      {isLoading && (
        <LoadingMask cHeight={26} cWidth={26} bg="inherit" opacity={1} />
      )}
    </div>
  );
}

export default LoadMoreButton;

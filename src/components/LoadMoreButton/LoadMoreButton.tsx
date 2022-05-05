import React, { FC, useState } from 'react';
import LoadingMask from '../LoadingMask/LoadingMask';
import { LoadMoreButtonProps } from './types';

const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  action,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = () => {
    setIsLoading(true);
    action()
      .then((result) => {
        if (result) setIsLoading(false);
      });
  };

  return (
    <div className="load-more">
      <button
        type="button"
        className="load-more__button"
        onClick={clickHandler}
      >
        Загрузить еще
      </button>
      {isLoading && (
        <LoadingMask
          size={26}
          bg="inherit"
          weight="thin"
          opacity={1}
        />
      )}
    </div>
  );
};

export default LoadMoreButton;

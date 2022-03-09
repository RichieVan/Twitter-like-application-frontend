import React, { useState } from 'react';
import LoadingMask from '../LoadingMask';

function PostLoadMore({ action }) {
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = () => {
    setIsLoading(true);
    action()
      .then(() => setIsLoading(false))
      .catch((callback) => callback());
  };

  return (
    <div className="load-more_container">
      <button
        type="button"
        className="feed-load-more"
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

export default PostLoadMore;

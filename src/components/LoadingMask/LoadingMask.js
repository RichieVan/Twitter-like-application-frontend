import React from 'react';
import LoadingCircle from '../../assets/img/icons/loading.svg';

function LoadingMask({
  cHeight,
  cWidth,
  bg,
  opacity,
}) {
  const styles = {
    backgroundColor: bg,
    opacity,
  };

  return (
    <div className="loading-content" style={styles}>
      <LoadingCircle height={cHeight} width={cWidth} />
    </div>
  );
}

export default LoadingMask;

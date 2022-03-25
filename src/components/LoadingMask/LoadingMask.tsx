import React, { FC } from 'react';
import LoadingCircle from '../../assets/img/icons/loading.svg';
import { LoadingMaskProps } from './types';

const LoadingMask: FC<LoadingMaskProps> = ({
  cHeight,
  cWidth,
  bg,
  opacity,
}) => {
  const styles = {
    backgroundColor: bg,
    opacity,
  };

  return (
    <div className="loading-content" style={styles}>
      <LoadingCircle height={cHeight} width={cWidth} />
    </div>
  );
};

export default LoadingMask;

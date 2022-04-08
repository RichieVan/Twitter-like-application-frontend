import React, { FC } from 'react';
import LoadingCircle from '../../assets/img/icons/loading.svg';
import getClassList from '../../lib/getClassList/getClassList';
import { LoadingMaskProps } from './types';

const LoadingMask: FC<LoadingMaskProps> = ({
  size,
  bg = 'transparent',
  weight,
  opacity,
}) => {
  const mods = [`bg_${bg}`];
  if (weight) mods.push(`weight_${weight}`);
  const classList = getClassList('loading-content', mods);

  const styles = {
    opacity,
  };

  return (
    <div className={classList} style={styles}>
      <LoadingCircle height={size} width={size} />
    </div>
  );
};

export default LoadingMask;

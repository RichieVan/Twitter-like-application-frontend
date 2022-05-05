import React, { FC } from 'react';
import LoadingCircle from '../../assets/img/icons/loading.svg';
import getClassList from '../../lib/getClassList/getClassList';
import { LoadingMaskProps } from './types';

const LoadingMask: FC<LoadingMaskProps> = ({
  size = 50,
  position = 'absolute',
  bg = 'transparent',
  opacity = 1,
  weight,
}) => {
  const mods = [`bg_${bg}`];
  if (weight) mods.push(`weight_${weight}`);
  const classList = getClassList('loading-content', mods);

  const styles = {
    opacity,
    position,
  };

  return (
    <div className={classList} style={styles}>
      <LoadingCircle height={size} width={size} />
    </div>
  );
};

export default LoadingMask;

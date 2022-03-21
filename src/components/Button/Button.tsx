import React, { FC } from 'react';

import getClassList from '../../lib/getClassList';
import IButtonProps from './types';

const Button: FC<IButtonProps> = ({
  type,
  disabled = false,
  mods = [],
  children,
  onClick,
}) => {
  const classList: string = getClassList('btn', mods);

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      disabled={disabled}
      onClick={onClick}
      className={classList}
    >
      {children}
    </button>
  );
};

export default Button;

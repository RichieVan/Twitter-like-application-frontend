import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getClassList from '../../lib/getClassList/getClassList';
import { PanelButtonProps } from './types';

const PanelButton: FC<PanelButtonProps> = ({
  clickHandler,
  icon,
  mods,
  children,
}) => {
  const classList = getClassList('panel-button', mods);

  return (
    <button
      type="button"
      className={classList}
      onClick={clickHandler}
    >
      <div className="panel-button__wrapper">
        <FontAwesomeIcon icon={icon} />
        <span>{children}</span>
      </div>
    </button>
  );
};

export default PanelButton;

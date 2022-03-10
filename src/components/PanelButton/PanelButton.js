import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PanelButton({
  mods,
  handler,
  icon,
  children,
}) {
  const baseClass = 'panel-button';
  const classList = [baseClass].concat(mods.map((val) => `${baseClass}_${val}`)).join(' ');

  return (
    <button
      type="button"
      className={classList}
      onClick={() => handler()}
    >
      <div className="panel-button__wrapper">
        <FontAwesomeIcon icon={icon} />
        <span>{children}</span>
      </div>
    </button>
  );
}

export default PanelButton;

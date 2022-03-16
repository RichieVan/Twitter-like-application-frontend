import React from "react";

function Button({
  type = 'button',
  mods = [],
  disabled = false,
  clickHandler = null,
  children,
}) {
  const baseClass = 'btn';
  const classArray = [baseClass];
  mods.forEach((val) => classArray.push(`${baseClass}_${val}`));
  const classList = classArray.join(' ');

  return (
    <button
      type={type}
      className={classList}
      disabled={disabled}
      onClick={(e) => {
        if (clickHandler) clickHandler(e);
      }}
    >
      {children}
    </button>
  );
}

export default Button;

import React from 'react';

function FormGroup({
  heading = '',
  mods = [],
  children,
}) {
  const classArray = ['form-group'];
  mods.forEach((mod) => classArray.push(`form-group_${mod}`));
  const classList = classArray.join(' ');

  const childsList = children.length ? children : [children];
  const wrappedChildrens = childsList.map((val, index) => (
    <div
      key={index}
      className="form-group__input-wrapper"
    >
      {val}
    </div>
  ));

  return (
    <div className={classList}>
      {heading ? <h3 className="form-group__heading">{heading}</h3> : null}
      {wrappedChildrens}
    </div>
  );
}

export default FormGroup;

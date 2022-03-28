import React, { FC, ReactElement, ReactNode } from 'react';
import getClassList from '../../lib/getClassList/getClassList';
import { FormGroupProps } from './types';

const FormGroup: FC<FormGroupProps> = ({
  heading = '',
  mods = [],
  children,
}) => {
  const classList = getClassList('form-group', mods);
  const wrappedChilds = React.Children.map<ReactElement, ReactNode>(children, (child, index) => (
    <div
      key={index}
      className="form-group__input-wrapper"
    >
      {child}
    </div>
  ));

  return (
    <div className={classList}>
      {heading ? <h3 className="form-group__heading">{heading}</h3> : null}
      {wrappedChilds}
    </div>
  );
};

export default FormGroup;

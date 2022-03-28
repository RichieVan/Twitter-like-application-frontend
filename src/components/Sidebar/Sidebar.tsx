import React, { FC } from 'react';

const Sidebar: FC = ({
  children,
}) => {
  const wrappedChildrens = React.Children.map(children, (val, index) => (
    <div
      key={index}
      className="sidebar__block-wrapper"
    >
      {val}
    </div>
  ));

  return (
    <div className="sidebar">
      {wrappedChildrens}
    </div>
  );
};

export default Sidebar;

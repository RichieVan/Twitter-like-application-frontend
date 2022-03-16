import React from 'react';

function Sidebar({ children }) {
  const childsList = children.length ? children : [children];
  const wrappedChildrens = childsList.map((val, index) => {
    return (
      <div
        key={index}
        className="sidebar__block-wrapper"
      >
        {val}
      </div>
    );
  });

  return (
    <div className="sidebar">
      {wrappedChildrens}
    </div>
  );
}

export default Sidebar;

import React from 'react';

function EmptyDataMessage({ children }) {
  return (
    <div className="empty-data-message">
      {children}
    </div>
  );
}

export default EmptyDataMessage;

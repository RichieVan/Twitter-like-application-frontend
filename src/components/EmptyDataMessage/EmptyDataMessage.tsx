import React, { FC } from 'react';

const EmptyDataMessage: FC = ({ children }) => (
  <div className="empty-data-message">
    {children}
  </div>
);

export default EmptyDataMessage;

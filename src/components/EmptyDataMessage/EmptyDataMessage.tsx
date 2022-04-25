import React, { FC } from 'react';

interface EmptyDataMessageProps {
  primary: string;
  secondary?: string;
}

const EmptyDataMessage: FC<EmptyDataMessageProps> = ({
  primary,
  secondary = '',
}) => (
  <div className="empty-data-message">
    <b className="empty-data-message__primary">{primary}</b>
    {secondary && (
      <span className="empty-data-message__secondary">{secondary}</span>
    )}
  </div>
);

export default EmptyDataMessage;

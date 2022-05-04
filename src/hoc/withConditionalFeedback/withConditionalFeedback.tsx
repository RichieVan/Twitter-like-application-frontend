/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import EmptyDataMessage from '../../components/EmptyDataMessage/EmptyDataMessage';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import { ConditionalFeedbackHOC } from './types';

const withConditionalFeedback: ConditionalFeedbackHOC = ({
  propName,
  showEmptyDataMessage = true,
}) => (BaseComponent) => {
  return ({
    data,
    isLoading,
    loadingProps,
    emptyMessagePrimary,
    emptyMessageSecondary,
    emptyDataCallback,
    dataVerifyCallback,
    ...clearProps
  }) => {
    if (isLoading) {
      return (
        <LoadingMask {...loadingProps}/>
      );
    }

    if (!dataVerifyCallback(data)) {
      if (emptyDataCallback) emptyDataCallback();
      if (showEmptyDataMessage && emptyMessagePrimary) {
        return (
          <EmptyDataMessage
            primary={emptyMessagePrimary}
            secondary={emptyMessageSecondary}
          />
        );
      }
    }

    const enhancedProps = {
      ...clearProps,
      [propName]: data,
    };

    return (<BaseComponent {...enhancedProps} />);
  };
};

export default withConditionalFeedback;

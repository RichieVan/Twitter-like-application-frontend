/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import EmptyDataMessage from '../../components/EmptyDataMessage/EmptyDataMessage';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import { ConditionalFeedback } from './types';

const withConditionalFeedback: ConditionalFeedback = (Component, config) => {
  const getPropName = (): string | number | symbol => {
    if (config && config.propName) {
      return config.propName;
    }
    return 'data';
  };

  return (props) => {
    const { data, ...propsWithoutData } = props;
    const { isLoading, emptyMessagePrimary, emptyMessageSecondary } = propsWithoutData;

    if (isLoading) {
      return (
        <LoadingMask
          size={50}
          bg="inherit"
          opacity={1}
        />
      );
    }

    if (data.length === 0) {
      return (
        <EmptyDataMessage
          primary={emptyMessagePrimary}
          secondary={emptyMessageSecondary}
        />
      );
    }

    const enhancedProps = {
      ...propsWithoutData,
      [getPropName()]: data,
    };

    return (<Component {...enhancedProps} />);
  };
};

export default withConditionalFeedback;

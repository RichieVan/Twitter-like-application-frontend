/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import LoadingMask from '../../components/LoadingMask/LoadingMask';
import { LoadingHOC } from './types';

const withLoading: LoadingHOC = ({
  overlap = false,
}) => (BaseComponent) => {
  return ({
    isLoading,
    loadingProps,
    ...baseComponentProps
  }) => {
    if (isLoading) {
      if (overlap) {
        return (
          <>
            <BaseComponent {...baseComponentProps} />
            <LoadingMask {...loadingProps}/>
          </>
        );
      }

      return (
        <LoadingMask {...loadingProps}/>
      );
    }

    return (<BaseComponent {...baseComponentProps} />);
  };
};

export default withLoading;

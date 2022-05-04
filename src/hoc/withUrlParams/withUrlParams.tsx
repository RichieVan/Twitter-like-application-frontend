/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { WithUrlParamsVerify } from './types';

const withUrlParamsVerify: WithUrlParamsVerify = (Component, {
  params: requestedParams,
}) => ({
  cancellingAction,
  ...baseComponentProps
}) => {
  const urlParams = useParams();
  const allParamsIncluded = requestedParams.reduce((result, param) => {
    if (!urlParams[param]) return false;
    return result;
  }, true);

  if (!allParamsIncluded && cancellingAction) {
    cancellingAction();
    return null;
  }

  const paramsProps = requestedParams.reduce((paramsObject, param) => ({
    ...paramsObject,
    [param]: urlParams[param],
  }), {});
  const extendedProps = { ...baseComponentProps, ...paramsProps };

  return (
    <Component {...extendedProps} />
  );
};

export default withUrlParamsVerify;

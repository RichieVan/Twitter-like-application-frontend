import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import { Navigate, To } from 'react-router-dom';

import { Context } from '../Context';
import { UserData } from '../types/types';

interface AuthRedirectProps {
  notAuthRedirect?: To,
  notAuthElement?: JSX.Element;
  render?: (userData: UserData) => JSX.Element;
}

const AuthRequired: FC<AuthRedirectProps> = ({
  notAuthRedirect,
  notAuthElement,
  children,
  render,
}): JSX.Element | null => {
  const { userStore } = useContext(Context);
  let result: JSX.Element | null = null;

  if (userStore.user) {
    if (render) result = render(userStore.user);
    else if (React.isValidElement(children)) result = children;
  } else {
    if (notAuthRedirect) {
      result = (
        <Navigate
          to={notAuthRedirect}
          state={{ authRedirected: true }}
          replace
        />
      );
    }
    if (notAuthElement) result = notAuthElement;
  }

  return result;
};

export default observer(AuthRequired);

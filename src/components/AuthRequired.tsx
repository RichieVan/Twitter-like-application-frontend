import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';

import { Context } from '../Context';
import { UserData } from '../types/types';

interface AuthRedirectProps {
  renderOnNotAuth?: () => JSX.Element;
  renderOnAuth?: (userData: UserData) => JSX.Element;
}

const AuthRequired: FC<AuthRedirectProps> = ({
  renderOnNotAuth,
  renderOnAuth,
}): JSX.Element | null => {
  const { userStore } = useContext(Context);
  let result: JSX.Element | null = null;

  if (userStore.user && renderOnAuth) {
    result = renderOnAuth(userStore.user);
  } else if (renderOnNotAuth) {
    result = renderOnNotAuth();
  }

  return result;
};

export default observer(AuthRequired);

import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';

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

  const renderResult = (): JSX.Element | null => {
    if (userStore.user && renderOnAuth) {
      return renderOnAuth(userStore.user);
    }

    if (renderOnNotAuth) {
      return renderOnNotAuth();
    }

    return null;
  };

  return renderResult();
};

export default observer(AuthRequired);

import React, { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../../Context';

const GlobalMask: FC = () => {
  const { appStore } = useContext(Context);

  return (
    <div className={appStore.isGlobalLoading ? 'global-mask global-mask_active' : 'global-mask'}>
      <img
        className="global-mask__image"
        src={`${appStore.aliases.static}/img/icons/loading.svg`}
        alt=""
      />
    </div>
  );
};

export default observer(GlobalMask);

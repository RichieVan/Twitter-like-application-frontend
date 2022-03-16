import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../..';

function GlobalMask() {
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
}

export default observer(GlobalMask);

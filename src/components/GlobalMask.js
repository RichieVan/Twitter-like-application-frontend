import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { Context } from '..';

function GlobalMask() {
  const { appStore } = useContext(Context);

  return (
    <div className={appStore.isGlobalLoading ? 'global-mask active' : 'global-mask'}>
      <img
        src={`${appStore.aliases.static}/img/icons/loading.svg`}
        alt=""
      />
    </div>
  );
}

export default observer(GlobalMask);

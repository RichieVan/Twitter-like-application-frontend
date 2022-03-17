import React, { useContext } from 'react';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';

import PanelButton from '../PanelButton/PanelButton';
import { APP_URL } from '../../http';
import { Context } from '../../Context';

function CopyLinkButton({ postId }) {
  const { notificationStore } = useContext(Context);

  const mods = ['type_copy-link'];
  const clickHandler = () => {
    window.navigator.clipboard.writeText(`${APP_URL}/post/${postId}`)
      .then(() => {
        notificationStore.show('Скопировано!', 2000, 'success');
      });
  };

  return (
    <PanelButton
      mods={mods}
      handler={clickHandler}
      icon={faRetweet}
    />
  );
}

export default CopyLinkButton;

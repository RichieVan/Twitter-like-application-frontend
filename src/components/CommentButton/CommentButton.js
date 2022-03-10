import React from 'react';

import { faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import PanelButton from '../PanelButton/PanelButton';

function CommentButton({ componentData, isNavigate = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const mods = ['type_comment'];
  const clickHandler = () => {
    if (isNavigate) {
      navigate(`/post/${componentData.id}`, {
        state: { backgroundLocation: location.pathname },
      });
    }
  };

  return (
    <PanelButton
      mods={mods}
      handler={clickHandler}
      icon={faCommentRegular}
    >
      {componentData.commentsCount > 0 ? componentData.commentsCount : ''}
    </PanelButton>
  );
}

export default CommentButton;

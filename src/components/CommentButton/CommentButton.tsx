import React, { FC } from 'react';

import { faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import PanelButton from '../PanelButton/PanelButton';
import { CommentDataProps } from './types';

const CommentButton: FC<CommentDataProps> = ({
  postData,
  isNavigate = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mods = ['type_comment'];
  const clickHandler = () => {
    if (isNavigate) {
      navigate(`/post/${postData.id}`, {
        state: { backgroundLocation: location.pathname },
      });
    }
  };

  return (
    <PanelButton
      mods={mods}
      clickHandler={clickHandler}
      icon={faCommentRegular}
    >
      {postData.commentsCount > 0 ? postData.commentsCount : ''}
    </PanelButton>
  );
};

export default CommentButton;

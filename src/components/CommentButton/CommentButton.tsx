import React, { FC, useContext } from 'react';

import { faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import PanelButton from '../PanelButton/PanelButton';
import { CommentDataProps } from './types';
import { Context } from '../../Context';

const CommentButton: FC<CommentDataProps> = ({
  postData,
  isNavigate = true,
}) => {
  const { postStore } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const mods = ['type_comment'];
  const clickHandler = () => {
    if (isNavigate) {
      postStore.setCurrentCommentsList([], true);
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

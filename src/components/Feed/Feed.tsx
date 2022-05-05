import React, { useEffect, useContext, FC } from 'react';
import { observer } from 'mobx-react-lite';

import PostForm from '../PostForm/PostForm';
import { Context } from '../../Context';
import FeedTypeChange from '../FeedTypeChange/FeedTypeChange';
import FeedPostsController from '../FeedPostsController/FeedPostsController';
import { IFeedProps } from './types';
import { SubmitActionData } from '../PostForm/types';

const Feed: FC<IFeedProps> = ({ userData }) => {
  const { postStore } = useContext(Context);

  useEffect(() => {
    document.title = 'Главная';
  }, []);

  const postFormSubmitAction = async ({ textContent, userId }: SubmitActionData) => {
    postStore.createPost({
      textContent,
      userId,
    });
  };

  return (
    <div className="feed">
      <PostForm
        userData={userData}
        submitAction={postFormSubmitAction}
        placeholder={'Напишите что-нибудь...'}
      />
      <FeedTypeChange />
      <div className="feed__posts">
        <FeedPostsController key={postStore.feedType} />
      </div>
    </div>
  );
};

export default observer(Feed);

import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import PostComment from '../PostComment/PostComment';
import { CommentsListProps } from './types';

const CommentsList: FC<CommentsListProps> = ({
  commentsData = [],
  postOwner,
  deleteCommentHandler,
}) => {
  const comments = commentsData.map((commentData) => (
    <PostComment
      key={commentData.id}
      data={commentData}
      postOwner={postOwner}
      deleteCommentHandler={deleteCommentHandler}
    />
  ));

  return (
    <div className="comments">
      {comments}
    </div>
  );
};

export default observer(CommentsList);

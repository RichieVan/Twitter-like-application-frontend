import { observer } from 'mobx-react-lite';
import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';

import { Context } from '../../Context';
import formatPostText from '../../lib/formatPostText/formatPostText';
import EmptyDataMessage from '../EmptyDataMessage/EmptyDataMessage';
import LoadingMask from '../LoadingMask/LoadingMask';
import PostComment from '../PostComment/PostComment';
import { CommentsListProps } from './types';

const CommentsList: FC<CommentsListProps> = ({
  postId,
  postOwner,
}) => {
  const { postStore } = useContext(Context);
  const [comments, setComments] = useState<ReactElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postStore.currentCommentsList.length === 0) {
      postStore.fetchComments(postId)
        .then((result) => {
          if (result.length === 0) {
            setIsLoading(false);
            return;
          }

          setComments(
            result.map((val) => {
              const contentArray = formatPostText(val.textContent);
              return (
                <PostComment
                  key={val.id}
                  postOwner={postOwner}
                  data={val}
                  contentArray={contentArray}
                />
              );
            }),
          );

          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (postStore.currentCommentsList.length !== comments.length) {
    setComments(
      postStore.currentCommentsList.map((val) => {
        const contentArray = formatPostText(val.textContent);
        return (
          <PostComment
            key={val.id}
            postOwner={postOwner}
            data={val}
            contentArray={contentArray}
          />
        );
      }),
    );
  }

  const render = () => {
    if (isLoading) {
      return (
        <LoadingMask
          cHeight={50}
          cWidth={50}
          bg="inherit"
          opacity={1}
        />
      );
    }
    if (comments.length > 0) return comments;

    return (
      <EmptyDataMessage>
        <b>Здесь нет ни одного комментария :(</b>
        <span>Будьте первыми!</span>
      </EmptyDataMessage>
    );
  };

  return (
    <div className="comments">
      {render()}
    </div>
  );
};

export default observer(CommentsList);

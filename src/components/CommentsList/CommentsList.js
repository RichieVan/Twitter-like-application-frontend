import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../Context';
import FormatPostText from '../../lib/formatPostText';
import EmptyDataMessage from '../EmptyDataMessage/EmptyDataMessage';
import LoadingMask from '../LoadingMask/LoadingMask';
import PostComment from '../PostComment/PostComment';

function CommentsList({ postId, postOwner }) {
  const { postStore } = useContext(Context);
  const [comments, setComments] = useState([]);
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
              const contentArray = FormatPostText(val.textContent);
              return (
                <PostComment
                  key={val.id}
                  postId={postId}
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
        const contentArray = FormatPostText(val.textContent);
        return (
          <PostComment
            key={val.id}
            postId={postId}
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
}

export default observer(CommentsList);

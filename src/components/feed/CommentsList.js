import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import FormatPostText from '../../lib/formatPostText';
import LoadingMask from '../LoadingMask';
import PostComment from './PostComment';
import './style.css';

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
      <div className="feed-no-data">
        <b>Здесь нет ни одного комментария :(</b>
        <span>Будьте первыми!</span>
      </div>
    );
  };

  return (
    <div className="comments">
      {render()}
    </div>
  );
}

export default observer(CommentsList);

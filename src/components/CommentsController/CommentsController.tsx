import React, { FC, useContext, useEffect, useState } from 'react';

import { Context } from '../../Context';
import withConditionalFeedback from '../../hoc/withConditionalFeedback/withConditionalFeedback';
import getPostQueryParams from '../../lib/getPostQueryParams/getPostQueryParams';
import PostService from '../../services/PostService';
import { PostData } from '../../types/types';
import CommentsList from '../CommentsList/CommentsList';
import { CommentsListProps } from '../CommentsList/types';
import PostForm from '../PostForm/PostForm';
import { SubmitActionData } from '../PostForm/types';
import { ICommentsControllerProps } from './types';

const CommentsListWithConditionalFeedback = withConditionalFeedback<PostData[], CommentsListProps>({
  propName: 'commentsData',
})(CommentsList);

const CommentsController: FC<ICommentsControllerProps> = ({
  postData,
}) => {
  const { userStore } = useContext(Context);
  const [commentsData, setCommentsData] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    PostService
      .getComments(postData.id)
      .then(({ data }) => {
        setCommentsData(data);
        setIsLoading(false);
      });
  }, []);

  const commentCreateHandler = async ({ textContent, userId }: SubmitActionData) => {
    const postQueryParams = getPostQueryParams(commentsData[0]);
    const { data } = await PostService.createComment({
      textContent,
      userId,
      postId: postData.id,
      params: postQueryParams,
    });
    setCommentsData([...data, ...commentsData]);
  };

  const deleteCommentHandler = (id: number) => {
    setCommentsData(commentsData.filter((comment) => comment.id !== id));
  }

  return (
    <>
      {userStore.user && (
        <PostForm
          userData={userStore.user}
          submitAction={commentCreateHandler}
          placeholder={'Напишите комментарий...'}
        />
      )}
      <CommentsListWithConditionalFeedback
        data={commentsData}
        isLoading={isLoading}
        loadingProps={{ position: 'static' }}
        emptyMessagePrimary="Здесь нет ни одного комментария :("
        emptyMessageSecondary="Будьте первыми!"
        postOwner={postData.user}
        dataVerifyCallback={(data) => data.length > 0}
        deleteCommentHandler={deleteCommentHandler}
      />
    </>
  );
};

export default CommentsController;
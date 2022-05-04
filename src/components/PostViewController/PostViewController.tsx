import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../Context';
import withConditionalFeedback from '../../hoc/withConditionalFeedback/withConditionalFeedback';
import PostService from '../../services/PostService';
import { PostData, PostViewParams } from '../../types/types';
import PostView from '../PostView/PostView';
import { PostViewProps } from '../PostView/types';

const PostViewWithConditionalFeedback = withConditionalFeedback<PostData | undefined, PostViewProps>({
  propName: 'data',
})(PostView);

const PostViewController = () => {
  const { notificationStore } = useContext(Context);
  const [postData, setPostData] = useState<PostData>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams<PostViewParams>();
  const navigate = useNavigate();

  const paramsId = Number(params.id);
  useEffect(() => {
    if (paramsId && !Number.isNaN(paramsId)) {
      PostService
        .getById(Number(paramsId))
        .then(({ data }) => {
          setPostData(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <PostViewWithConditionalFeedback
      data={postData}
      isLoading={isLoading}
      emptyDataCallback={() => {
        notificationStore.show('Пост не найден', 3000);
        navigate('/');
      }}
      dataVerifyCallback={(data) => typeof data !== 'undefined'}
    />
  );
};

export default PostViewController;

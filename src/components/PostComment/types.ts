import { ReactElement } from 'react';
import { PostData, PostUserData } from '../../types/types';

export interface PostCommentProps {
  data: PostData;
  postOwner: PostUserData;
  deleteCommentHandler: (id: number) => void;
}

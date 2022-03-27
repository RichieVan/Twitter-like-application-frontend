import { ReactElement } from 'react';
import { PostData, PostUserData } from '../../types/types';

export interface PostCommentProps {
  data: PostData;
  contentArray: ReactElement[];
  postOwner: PostUserData;
}

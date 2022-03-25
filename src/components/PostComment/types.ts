import { ReactElement } from 'react';
import { PostData, UserData } from '../../types/types';

export interface PostCommentProps {
  data: PostData;
  contentArray: ReactElement[];
  postOwner: UserData;
}

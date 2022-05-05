import { PostData, PostUserData } from '../../types/types';

export interface CommentsListProps {
  commentsData?: PostData[];
  postOwner: PostUserData;
  deleteCommentHandler: (id: number) => void;
}

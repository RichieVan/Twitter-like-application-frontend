import { PostData } from '../../types/types';

export interface PostsListProps {
  postsData?: PostData[];
  canLoadMore: boolean;
  loadMoreAction: () => Promise<any>;
  isSyncing: boolean;
}

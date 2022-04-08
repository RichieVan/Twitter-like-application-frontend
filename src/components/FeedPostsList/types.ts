import { PostData } from '../../types/types';

export interface FeedPostsListProps {
  canLoadMore: boolean;
  loadMoreAction: () => Promise<any>;
  postsData: PostData[] | null;
  isSyncing: boolean;
}

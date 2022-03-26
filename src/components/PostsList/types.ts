export interface PostsListProps {
  canLoadMore: boolean;
  loadMoreAction: () => Promise<any>;
  isSyncing: boolean;
}

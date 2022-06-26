import { PostData } from '../../../types/types';

export type FeedType = 'subs' | 'all';

export interface FeedState {
  posts: PostData[];
  loading: boolean;
  syncing: boolean;
  firstLoaded: PostData | null;
  lastLoaded: PostData | null;
  canLoadMore: boolean;
  type: FeedType;
  canChangeType: boolean;
}

export type SetPostsPayload = PostData[];

export interface FetchPostsSuccessPayload {
  posts: PostData[];
  canLoadMore: boolean;
  canChangeType: boolean;
}

export interface LoadMorePostsSuccessPayload {
  posts: PostData[];
  canLoadMore: boolean;
}

export interface DeletePostPayload {
  id: number;
}

export const FEED_FETCH_POSTS = 'feed/asyncFetchPosts';
export const FEED_LOAD_MORE_POSTS = 'feed/asyncLoadMorePosts';
export const FEED_SYNC_POSTS = 'feed/asyncSyncPosts';

import { PostData } from '../../../types/types';

export type FeedType = 'subs' | 'all';

export interface FeedState {
  posts: PostData[];
  firstLoaded: PostData | null;
  lastLoaded: PostData | null;
  canLoadMore: boolean;
  type: FeedType;
  canChangeType: boolean;
}

export interface SetPostsPayload {
  posts: PostData[];
}

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

export const ASYNC_FETCH_POSTS = 'feed/asyncFetchPosts';
export const ASYNC_LOAD_MORE_POSTS = 'feed/asyncLoadMorePosts';

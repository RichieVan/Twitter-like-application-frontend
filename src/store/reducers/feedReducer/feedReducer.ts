import {
  Action, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import {
  FEED_FETCH_POSTS,
  FEED_LOAD_MORE_POSTS,
  DeletePostPayload,
  FeedState,
  FetchPostsSuccessPayload,
  LoadMorePostsSuccessPayload,
  SetPostsPayload,
} from './types';
import { PostData } from '../../../types/types';

const initialState: FeedState = {
  posts: [],
  firstLoaded: null,
  lastLoaded: null,
  canLoadMore: false,
  type: 'all',
  canChangeType: false,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPosts: (state, { payload: { posts } }: PayloadAction<SetPostsPayload>) => {
      const lastLoaded = posts.length > 0 ? posts[0] : null;
      const firstLoaded = posts.length > 0 ? posts[posts.length - 1] : null;

      return {
        ...state,
        posts,
        lastLoaded,
        firstLoaded,
      };
    },
    fetchPostsSuccess: (
      state,
      {
        payload,
      }: PayloadAction<FetchPostsSuccessPayload>,
    ) => ({
      ...state,
      ...payload,
    }),
    loadMorePostsSuccess: (
      state,
      {
        payload: { posts, canLoadMore },
      }: PayloadAction<LoadMorePostsSuccessPayload>,
    ) => {
      const { posts: feedPosts } = state;
      const updatedPosts: PostData[] = feedPosts
        ? feedPosts.concat(posts)
        : posts;

      return {
        ...state,
        posts: updatedPosts,
        canLoadMore,
      };
    },
    deletePostSuccess: (state, { payload: { id } }: PayloadAction<DeletePostPayload>) => ({
      ...state,
      feedPostsList: state.posts.filter((postData) => postData.id !== id),
    }),
  },
});

export const asyncFetchPosts = (): Action => ({
  type: FEED_FETCH_POSTS,
});

export const asyncLoadMorePosts = (): Action => ({
  type: FEED_LOAD_MORE_POSTS,
});

export const {
  setPosts,
  fetchPostsSuccess,
  loadMorePostsSuccess,
  deletePostSuccess,
} = feedSlice.actions;

export default feedSlice.reducer;

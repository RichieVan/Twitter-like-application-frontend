import { Selector } from '@reduxjs/toolkit';
import { PostData } from '../../../types/types';
import { FeedState, FeedType } from './types';
import type { RootState } from '../../index';

export const selectFeed: Selector<RootState, FeedState> = ({ feed }) => feed;

export const selectFeedLoading: Selector<RootState, boolean> = (
  state,
) => selectFeed(state).loading;
export const selectFeedSyncing: Selector<RootState, boolean> = (
  state,
) => selectFeed(state).syncing;
export const selectFeedFirstLoaded: Selector<RootState, PostData | null> = (
  state,
) => selectFeed(state).firstLoaded;
export const selectFeedType: Selector<RootState, FeedType> = (
  state,
) => selectFeed(state).type;
export const selectFeedPosts: Selector<RootState, PostData[]> = (
  state,
) => selectFeed(state).posts;
export const selectFeedCanLoadMore: Selector<RootState, boolean> = (
  state,
) => selectFeed(state).canLoadMore;

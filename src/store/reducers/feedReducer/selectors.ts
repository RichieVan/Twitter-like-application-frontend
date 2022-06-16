import { Selector } from '@reduxjs/toolkit';
import { PostData } from '../../../types/types';
import { FeedState, FeedType } from './types';

export const selectFeedFirstLoaded: Selector<FeedState, PostData | null> = ({
  firstLoaded,
}) => firstLoaded;

export const selectFeedType: Selector<FeedState, FeedType> = ({ type }) => type;
export const selectFeedPosts: Selector<FeedState, PostData[]> = ({ posts }) => posts;

import { makeAutoObservable, toJS } from 'mobx';
import ErrorHelper from '../helpers/ErrorHelper';

import PostService from '../services/PostService';
import {
  BaseNewCommentData,
  BaseNewPostData,
  CurrentList,
  FetchedPostsData,
  IPostStore,
  PostData,
} from '../types/types';

export default class PostStore implements IPostStore {
  feedPostsList: PostData[] = [];

  currentCommentsList: PostData[] = [];

  firstLoaded: PostData | null = null;

  lastLoaded: PostData | null = null;

  canLoadMore: boolean = false;

  syncing: boolean = false;

  syncFunction: (() => void) | null = null;

  currentList: CurrentList = {
    type: null,
  };

  feedType: 'subs' | 'all' = localStorage.getItem('feedType') === 'subs' ? 'subs' : 'all';

  canChangeFeedType: boolean = false;

  constructor() {
    makeAutoObservable(this, undefined, { deep: true });
    this.feedType = localStorage.getItem('feedType') === 'subs' ? 'subs' : 'all';
  }

  setSyncing(state: boolean): void {
    this.syncing = state;
  }

  setSyncFunction(state: () => void): void {
    this.syncFunction = state;
  }

  setCurrentList(state: { type: 'feed' | null; }): void {
    this.currentList = state;
  }

  setCanLoadMore(state: boolean): void {
    this.canLoadMore = state;
  }

  setFeedPostsList(state: PostData[]): void {
    if (state.length > 0) {
      this.lastLoaded = state[0];
      this.firstLoaded = state[state.length - 1];
    } else {
      this.lastLoaded = null;
      this.firstLoaded = null;
    }

    this.feedPostsList = state;
  }

  setCurrentCommentsList(comments: PostData[], clear: boolean = false): void {
    if (clear) this.currentCommentsList = [];
    else this.currentCommentsList = comments.concat(this.currentCommentsList);
  }

  setFeedType(state: 'subs' | 'all'): void {
    this.setFeedPostsList([]);
    this.feedType = state;
    localStorage.setItem('feedType', state);
  }

  setCanChangeFeedType(state: boolean): void {
    this.canChangeFeedType = state;
  }

  deleteFromFeedPostsList(id: number): void {
    if (this.feedPostsList) {
      this.feedPostsList = toJS(this.feedPostsList).filter((value) => value.id !== Number(id));
    }
  }

  deleteFromCurrentCommentsList(id: number): void {
    const convertedCommentsList = toJS(this.currentCommentsList);
    this.currentCommentsList = convertedCommentsList.filter((value) => value.id !== Number(id));
  }

  async createPost(postData: BaseNewPostData): Promise<void> {
    try {
      this.setSyncing(true);
      const fromPost = toJS(this.firstLoaded);
      const fromTimestamp = new Date(fromPost?.createdAt.timestamp || 0).toISOString();
      const { data } = await PostService.create({
        ...postData,
        params: {
          fromTimestamp,
          fromId: fromPost?.id || 0,
          forSubs: this.feedType === 'subs',
        },
      });

      this.setFeedPostsList(data);
      this.setSyncing(false);
    } catch (e) {
      this.setSyncing(false);
      ErrorHelper.handleUnexpectedError();
    }
  }

  async createComment(postData: BaseNewCommentData): Promise<void> {
    try {
      const fromPost = toJS(this.currentCommentsList)[0];
      const fromTimestamp = new Date(fromPost?.createdAt.timestamp || 0).toISOString();
      const { data } = await PostService.createComment({
        ...postData,
        params: {
          fromTimestamp,
          fromId: fromPost?.id || 0,
        },
      });
      this.setCurrentCommentsList(data);
    } catch (e) {
      ErrorHelper.handleUnexpectedError();
    }
  }

  async fetchPosts(): Promise<PostData[]> {
    const { data } = await PostService.getFeed({
      forSubs: (this.feedType === 'subs'),
    });

    this.setCurrentList({ type: 'feed' });
    this.setFeedPostsList(data.posts);
    this.setCanLoadMore(data.canLoadMore);
    this.setCanChangeFeedType(true);
    return data.posts;
  }

  async loadMorePosts(): Promise<boolean> {
    const fromPost = toJS(this.firstLoaded);
    const fromTimestamp = new Date(fromPost?.createdAt.timestamp || 0).toISOString();
    const { data } = await PostService.loadMore({
      fromTimestamp,
      fromId: fromPost?.id || 0,
      forSubs: (this.feedType === 'subs'),
    });

    if (this.feedPostsList) {
      this.setFeedPostsList(toJS<PostData[]>(this.feedPostsList).concat(data.posts));
    } else {
      this.setFeedPostsList(data.posts);
    }
    return data.canLoadMore;
  }

  async syncPosts(): Promise<void> {
    if (this.feedPostsList.length > 0 && this.firstLoaded) {
      this.setSyncing(true);
      const fromPost = toJS(this.firstLoaded);
      const fromTimestamp = new Date(fromPost.createdAt.timestamp || 0).toISOString();
      const { data } = await PostService.syncPosts({
        fromTimestamp,
        fromId: fromPost?.id || 0,
        forSubs: (this.feedType === 'subs'),
      });

      this.setSyncing(false);
      this.setFeedPostsList(data);
    }
    this.setSyncing(false);
  }

  async fetchComments(postId: number): Promise<PostData[]> {
    const { data } = await PostService.getComments(postId);
    this.setCurrentCommentsList(data);
    return this.currentCommentsList;
  }

  async deletePost(id: number): Promise<void> {
    try {
      const { data } = await PostService.deletePost(id);
      this.deleteFromFeedPostsList(data);
    } catch (e) {
      ErrorHelper.handleUnexpectedError();
    }
  }

  async deleteComment(id: number): Promise<void> {
    try {
      const { data } = await PostService.deletePost(id);
      this.deleteFromCurrentCommentsList(data);
    } catch (e) {
      ErrorHelper.handleUnexpectedError();
    }
  }

  async loadMoreUserPosts(userId: number, fromPost: PostData): Promise<FetchedPostsData> {
    const fromTimestamp = new Date(fromPost?.createdAt.timestamp || 0).toISOString();
    const { data } = await PostService.loadMoreUserPosts(
      userId,
      {
        fromTimestamp,
        fromId: fromPost?.id || 0,
      },
    );
    return data;
  }
}

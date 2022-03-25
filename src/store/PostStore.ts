import { makeAutoObservable, toJS } from 'mobx';

import PostService from '../services/PostService';
import {
  BaseNewPostData,
  CurrentList,
  FetchedPostsData,
  IPostStore,
  NewCommentData,
  PostData,
} from '../types/types';

export default class PostStore implements IPostStore {
  feedPostsList: PostData[] | null = [];

  currentCommentsList: PostData[] = [];

  firstLoaded: PostData | null = null;

  lastLoaded: PostData | null = null;

  canLoadMore: boolean = false;

  syncing: boolean = false;

  currentList: CurrentList = {
    type: null,
  };

  feedType: 'subs' | 'all' = localStorage.getItem('feedType') === 'subs' ? 'subs' : 'all';

  canChangeFeedType: boolean = false;

  constructor() {
    makeAutoObservable(this, undefined, { deep: true });
  }

  setSyncing(state: boolean): void {
    this.syncing = state;
  }

  setCurrentList(state: { type: 'feed' | null; }): void {
    this.currentList = state;
  }

  setCanLoadMore(state: boolean): void {
    this.canLoadMore = state;
  }

  setFeedPostsList(state: PostData[] | null): void {
    if (state === null) {
      this.lastLoaded = null;
      this.firstLoaded = null;
      this.feedPostsList = null;
    } else if (state.length > 0) {
      this.lastLoaded = state[0];
      this.firstLoaded = state[state.length - 1];
      this.feedPostsList = state;
    } else {
      this.lastLoaded = null;
      this.firstLoaded = null;
      this.feedPostsList = [];
    }
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
      // throw Error(e.response.data.message);
    }
  }

  async createComment(postData: NewCommentData): Promise<void> {
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
      // throw Error(e.response.data.message);
    }
  }

  async fetchPosts(): Promise<PostData[] | null> {
    const { data } = await PostService.getFeed({
      forSubs: (this.feedType === 'subs'),
    });

    this.setCanLoadMore(data.canLoadMore);
    return data.posts.length > 0 ? data.posts : null;
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

  async syncPosts(force: boolean): Promise<void | PostData[]> {
    if (this.feedPostsList && this.feedPostsList.length > 0) {
      this.setSyncing(true);
      const fromPost = toJS(this.firstLoaded);
      const fromTimestamp = new Date(fromPost?.createdAt.timestamp || 0).toISOString();
      const { data } = await PostService.syncPosts({
        fromTimestamp,
        fromId: fromPost?.id || 0,
        forSubs: (this.feedType === 'subs'),
      });

      this.setSyncing(false);
      if (force) this.setFeedPostsList(data);
      else return data;
    }
    this.setSyncing(false);
  }

  async fetchComments(postId: number): Promise<PostData[]> {
    const { data } = await PostService.getComments(postId);
    this.setCurrentCommentsList(data);
    return this.currentCommentsList;
  }

  // async loadNewPosts(): Promise<void> {
  //   try {
  //    const response = await PostService.loadNewPosts(toJS(this.currentCommentsList)[0]?.id || 0);
  //     this.setFeedPostsList(response.data);
  //   } catch (e) {
  //     // throw Error(e.response.data.message);
  //   }
  // }

  async deletePost(id: number): Promise<void> {
    try {
      const { data } = await PostService.deletePost(id);
      this.deleteFromFeedPostsList(data);
    } catch (e) {
      // throw Error(e.response.data.message);
    }
  }

  async deleteComment(id: number): Promise<void> {
    try {
      const { data } = await PostService.deletePost(id);
      this.deleteFromCurrentCommentsList(data);
    } catch (e) {
      // throw Error(e.response.data.message);
    }
  }

  async likePost(id: number): Promise<number> {
    const { data } = await PostService.like(id);
    return data;
  }

  async unlikePost(id: number): Promise<number> {
    const { data } = await PostService.unlike(id);
    return data;
  }

  async getUserPosts(id: number): Promise<PostData[]> {
    const { data } = await PostService.getUserPosts(id);
    return data;
  }

  async loadMoreUserPosts(userId: number, fromPost: PostData): Promise<void | FetchedPostsData> {
    try {
      const fromTimestamp = new Date(fromPost?.createdAt.timestamp || 0).toISOString();
      const { data } = await PostService.loadMoreUserPosts(
        userId,
        {
          fromTimestamp,
          fromId: fromPost?.id || 0,
        },
      );
      return data;
    } catch (e) {
      // console.log(e);
    }
  }

  async syncUserPosts(userId: number, fromPost: PostData): Promise<void | PostData[]> {
    try {
      this.setSyncing(true);
      const fromTimestamp = new Date(fromPost?.createdAt.timestamp || 0).toISOString();
      const { data } = await PostService.syncUserPosts(
        userId,
        {
          fromTimestamp,
          fromId: fromPost?.id || 0,
        },
      );

      this.setSyncing(false);
      return data;
    } catch (e) {
      this.setSyncing(false);
      // console.log(e);
    }
  }
}

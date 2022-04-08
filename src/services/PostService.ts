import api from '../http';
import {
  NewPostData,
  PostRequestParams,
  PostData,
  RequestPromise,
  NewCommentData,
  FetchedPostsData,
} from '../types/types';

export default class PostService {
  static async create(data: NewPostData): RequestPromise<PostData[]> {
    return api.post('/posts', data);
  }

  // static async getAllByUserId(userId: number): RequestPromise<PostData[]> {
  //   return api.get('/posts', {
  //     params: { userId },
  //   });
  // }

  static async getFeed(params: PostRequestParams): RequestPromise<FetchedPostsData> {
    return api.get('/posts', { params });
  }

  static async getUserPosts(id: number): RequestPromise<FetchedPostsData> {
    return api.get(`/posts/user/${id}`);
  }

  static async getById(id: number): RequestPromise<PostData> {
    return api.get(`/posts/one/${id}`);
  }

  static async loadMore(params: PostRequestParams): RequestPromise<FetchedPostsData> {
    return api.get('/posts/loadmore', { params });
  }

  static async loadMoreUserPosts(userId: number, params: PostRequestParams): RequestPromise<FetchedPostsData> {
    return api.get(`/posts/user/${userId}/loadmore`, { params });
  }

  static async syncPosts(params: PostRequestParams): RequestPromise<PostData[]> {
    return api.get('/posts/sync', { params });
  }

  static async syncUserPosts(userId: number, fromPost: PostData): RequestPromise<PostData[]> {
    const fromTimestamp = new Date(fromPost?.createdAt.timestamp || 0).toISOString();
    const params = {
      fromTimestamp,
      fromId: fromPost?.id || 0,
    };

    return api.get(`/posts/user/${userId}/sync`, { params });
  }

  static async createComment(data: NewCommentData): RequestPromise<PostData[]> {
    return api.post('/comments', data);
  }

  static async getComments(postId: number): RequestPromise<PostData[]> {
    return api.get(`/comments/${postId}`);
  }

  static async loadNewPosts(params: PostRequestParams): RequestPromise<PostData[]> {
    return api.get('/posts/new', { params });
  }

  static async deletePost(id: number): RequestPromise<number> {
    return api.delete(`/posts/${id}`);
  }

  static async like(id: number): RequestPromise<number> {
    return api.put('/posts/like', { id });
  }

  static async unlike(id: number): RequestPromise<number> {
    return api.put('/posts/unlike', { id });
  }
}

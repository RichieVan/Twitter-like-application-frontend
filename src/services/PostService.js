import api from '../http';

export default class PostService {
  static async create(data) {
    return api.post('/posts', data);
  }

  static async getAllByUserId(userId) {
    return api.get('/posts', {
      params: { userId },
    });
  }

  static async getFeed(params) {
    return api.get('/posts', {
      params: { ...params },
    });
  }

  static async getUserPosts(id) {
    return api.get(`/posts/user/${id}`);
  }

  static async getById(id) {
    return api.get(`/posts/one/${id}`);
  }

  static async loadMore(from) {
    return api.get('/posts/loadmore', {
      params: { ...from },
    });
  }

  static async loadMoreUserPosts(userId, from) {
    return api.get(`/posts/user/${userId}/loadmore`, {
      params: { ...from },
    });
  }

  static async syncPosts(params) {
    return api.get('/posts/sync', {
      params: { ...params },
    });
  }

  static async syncUserPosts(userId, from) {
    return api.get(`/posts/user/${userId}/sync`, {
      params: { ...from },
    });
  }

  static async createComment(data) {
    return api.post('/comments', data);
  }

  static async getComments(postId) {
    return api.get(`/comments/${postId}`);
  }

  static async loadNewPosts(from) {
    return api.get('/posts/new', {
      params: { from },
    });
  }

  static async deletePost(id) {
    return api.delete(`/posts/${id}`);
  }

  static async like(id) {
    return api.put('/posts/like', { id });
  }

  static async unlike(id) {
    return api.put('/posts/unlike', { id });
  }
}

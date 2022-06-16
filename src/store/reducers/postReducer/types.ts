export interface PostState {
  syncing: boolean;
  syncFunction: (() => void) | null;
}

export interface ToggleSyncingPayload {
  status: boolean;
}

export const ASYNC_CREATE_POST = 'post/asyncCreatePost';
export const ASYNC_SYNC_POSTS = 'post/asyncSyncPosts';

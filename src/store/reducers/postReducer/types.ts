import { ActivePostOptions } from '../../../types/types';

export interface PostState {
  syncing: boolean;
  syncFunction: (() => void) | null;
  activePostOptions: ActivePostOptions | null;
}

export interface ToggleSyncingPayload {
  status: boolean;
}

export type SetActivePostOptionsPayload = ActivePostOptions | null;

export const POST_CREATE = 'post/asyncCreate';
export const POST_SYNC = 'post/asyncSync';

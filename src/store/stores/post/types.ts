import { ActivePostOptions } from '../../../types/types';

export interface PostState {
  activePostOptions: ActivePostOptions | null;
}

export type SetActivePostOptionsPayload = ActivePostOptions | null;

export const POST_CREATE = 'post/asyncCreate';

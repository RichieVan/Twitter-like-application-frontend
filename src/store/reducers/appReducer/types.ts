import { ActivePostOptions, AppStoreAliases } from '../../../types/types';

export interface AppState {
  isFirstLoading: boolean;
  isGlobalLoading: boolean;
  activePostOptions: ActivePostOptions | null;
  aliases: AppStoreAliases;
}

export interface ToggleLoadingPayload {
  status: boolean;
}

export interface SetActivePostOptionsPayload {
  optionsType: ActivePostOptions | null;
}

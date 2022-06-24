import { AppStoreAliases } from '../../../types/types';

export interface AppState {
  isFirstLoading: boolean;
  isGlobalLoading: boolean;
  aliases: AppStoreAliases;
}

export interface ToggleLoadingPayload {
  status: boolean;
}

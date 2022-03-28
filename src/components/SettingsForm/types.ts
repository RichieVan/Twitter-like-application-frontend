import { LocationModalChildProps, UserData } from '../../types/types';

export type GoBackFunction = (() => () => void) | null;

export interface SettingsFormProps extends LocationModalChildProps {
  userData: UserData;
}

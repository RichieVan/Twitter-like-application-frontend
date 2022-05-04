import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type PostAction = {
  name: string;
  handler: () => void;
  icon?: IconDefinition;
  type?: 'error' | 'success' | 'default';
};

type PostActionsShowButtonMods = 'big';

export interface PostActionsProps {
  actions: PostAction[];
  show: boolean;
  showHandler: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  showButtonMods?: PostActionsShowButtonMods[];
  mods?: string[];
}

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface PanelButtonProps {
  clickHandler: () => void;
  icon: IconDefinition;
  mods: string[];
}

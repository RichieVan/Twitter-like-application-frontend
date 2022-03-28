import { ModalChildProps } from '../../types/types';

export interface UpdateAvatarProps extends ModalChildProps {
  directly?: boolean;
  fileUrlHandler: (dataUrl: string) => void;
}

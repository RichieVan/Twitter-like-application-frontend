import { NotificationType } from '../../types/types';

export interface NotificationProps {
  id: number;
  timeout: number;
  type?: NotificationType;
}

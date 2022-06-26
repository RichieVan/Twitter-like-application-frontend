import { Notification, NotificationType } from '../../../types/types';

// @TODO Перенести все notification типы в одно место

export interface NotificationState {
  notifications: Notification[];
  idCounter: number;
}

export interface NotificationShowPayload {
  content: string;
  timeout: number;
  type: NotificationType;
}

export interface NotificationClearPayload {
  id: number;
}

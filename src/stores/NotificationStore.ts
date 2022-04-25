import {
  makeObservable,
  observable,
  action,
} from 'mobx';
import { INotificationInterface, Notification, NotificationType } from '../types/types';

export default class NotificationStore implements INotificationInterface {
  notifications: Notification[] = [];

  idCounter: number = 0;

  constructor() {
    makeObservable(
      this,
      {
        notifications: observable,
        idCounter: observable,
        show: action,
        clear: action,
        incrementCounter: action,
      },
      { deep: true },
    );
  }

  show(content: string, timeout: number, type: NotificationType = 'info'): void {
    const notificationId = this.idCounter;
    this.incrementCounter();

    this.notifications = this.notifications.concat([{
      id: notificationId,
      content,
      timeout,
      type,
    }]);
  }

  clear(id: number): void {
    this.notifications = this.notifications.filter((item) => item.id !== id);
  }

  incrementCounter(): number {
    this.idCounter += 1;
    return this.idCounter;
  }
}

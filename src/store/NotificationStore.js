import React from "react";
import { makeObservable, observable, action, makeAutoObservable } from "mobx";

export default class NotificationStore {
    notifications = [];
    idCounter = 0;

    constructor() {
        makeObservable(this, 
            {
                notifications : observable,
                idCounter : observable,
                show : action,
                clear : action,
                incrementCounter : action
            }, 
            {deep: true}
        );
    }   

    show (content, timeout, type = 'info') {
        const notificationId = this.idCounter;
        this.incrementCounter();

        this.notifications = this.notifications.concat([{
            id: notificationId,
            content,
            timeout,
            type
        }]);
    }

    clear (id) {
        this.notifications = this.notifications.filter(item => item.id != id);
    }

    incrementCounter () {
        return this.idCounter++;
    }
}
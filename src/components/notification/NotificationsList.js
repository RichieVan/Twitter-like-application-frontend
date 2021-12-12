import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import './style.css';
import Notification from './Notification';

const NotificationsList = () => {
    const {notificationStore} = useContext(Context);

    return (
        <div className='notifications'>
            {notificationStore.notifications.map((value, index) => {
                const {id, content, timeout, type} = value;
                return (
                    <Notification key={id} id={id} type={type} timeout={timeout}>
                        {content}
                    </Notification>
                );
            })}
        </div>
    )
}

export default observer(NotificationsList);
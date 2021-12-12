import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import FormatPostText from "../../lib/formatPostText";

const ProfileInfo = ({userData}) => {
    const {userStore, notificationStore} = useContext(Context);
    const [currentUserSubscribed, setCurrentUserSubscribed] = useState(userData.currentUserSubscribed);
    //const [loading, setLoading] = useState(true);

    const renderSubscribeButton = () => {
        if (currentUserSubscribed) {
            return (
                <button className="btn error" onClick={(e) => {
                    e.target.disabled = true;
                    userStore.unsubscribeFromUser(userData.id)
                        .then(result => {
                            setCurrentUserSubscribed(false);
                            e.target.disabled = false;
                            notificationStore.show(`Вы отписались от пользователя ${userData.username}`, 2000, 'info')
                        })
                }}>Отписаться</button>
            )
        } else {
            return (
                <button className="btn info" onClick={(e) => {
                    e.target.disabled = true;
                    userStore.subscribeToUser(userData.id)
                        .then(result => {
                            setCurrentUserSubscribed(true);
                            e.target.disabled = false;
                            notificationStore.show(`Вы подписались на пользователя ${userData.username}`, 2000, 'success')
                        })
                }}>Подписаться</button>
            )
        }
    }

    return (
        <div className="pf-info_container">
            <div className="pf-info">
                <b>Обо мне:</b>
                <p>{userData.about ? FormatPostText(userData.about) : 'Пользователь не оставил информации о себе'}</p>

            </div>
            <div className="pf-buttons">
                {userStore?.user.id && (userData.id !== userStore.user.id) && renderSubscribeButton()}
            </div>
        </div>
    )
}

export default observer(ProfileInfo);
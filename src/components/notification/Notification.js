import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo, faTimes } from '@fortawesome/free-solid-svg-icons';

const iconNames = {
    info: faInfo,
    success: faCheck,
    error: faTimes
}

const Notification = ({id, type, timeout, children}) => {
    const {notificationStore} = useContext(Context);
    const [fadingOut, setFadingOut] = useState(false);
    const [fadingIn, setFadingIn] = useState(false);
    const [containerClassList, setClassList] = useState(['nfc-container']);

    useEffect(() => {
        if (!fadingIn) {
            setFadingIn(true);
            setClassList(containerClassList.concat(['fading-in']));

            setTimeout(() => {
                setTimeout(() => {
                    setFadingOut(true);
                }, timeout);
            }, 300);
        } 

        if (fadingOut) {
            setFadingOut(false);
            setClassList(containerClassList.filter(item => item != 'fading-in').concat(['fading-out']));

            setTimeout(() => {
                notificationStore.clear(id);
            }, 500);
        }
    })

    return (
        <div className={containerClassList.join(' ')}>
            <div className={['content', type].join(' ')}>
                <FontAwesomeIcon icon={iconNames[type]} />
                <p className='text'>{children}</p>
            </div>
        </div>
    )
}

export default observer(Notification);
import { observer } from "mobx-react-lite";
import React, { cloneElement, useContext, useState } from "react";
import { Context } from "../..";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';

const Modal = ({modalName, heading, fadingOutTime, temporal, children}) => {
    const {modalStore} = useContext(Context);
    const [fadingOut, setFadingOut] = useState(false);

    const classList = [
        'modal',
        modalStore.active.includes(modalName) ? ' active' : '',
        fadingOut ? ' fading-out' : ''
    ];

    const styleList = {
        transition: `opacity ${fadingOutTime / 1000}s linear`
    };

    let closeFunction;
    if (temporal) {
        closeFunction = () => {
            modalStore.setModalActive(modalName, false);
            modalStore.deleteFromModalsList(modalName);
            modalStore.deleteFromNamesList(modalName);
        }
    } else {
        closeFunction = () => {
            modalStore.setModalActive(modalName, false);
        }
    }

    const closeModal = () => {
        if (fadingOutTime) {
            setFadingOut(true);
            setTimeout(() => {
                setFadingOut(false);
                closeFunction();
            }, fadingOutTime);
        } else {
            closeFunction();
        }
    }
    
    return (
        <div 
            className={classList.join('')} 
            style={styleList}
            onClick={closeModal}
        >
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <h2 className='modal-heading'>{heading}</h2>
                <div className='modal-content'>
                    {cloneElement(children, {
                        closeModal
                    })}
                </div>
                <div className="modal-close" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>
            </div>
        </div>
    )
}

export default observer(Modal);
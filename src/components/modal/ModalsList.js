import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import './style.css';
import Modal from './Modal';

const ModalsList = () => {
    const {modalStore} = useContext(Context);

    return (
        <div className='modals'>
            {modalStore.modals.map((value) => {
                return (
                    <Modal key={value.props.modalName} {...value.props}>
                        {value.element}
                    </Modal>
                );
            })}
        </div>
    )
}

export default observer(ModalsList);
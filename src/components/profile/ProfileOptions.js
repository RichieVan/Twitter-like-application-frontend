import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../..";

const ProfileOptions = ({userId}) => {
    const {userStore} = useContext(Context);
    useEffect(() => {
        
    })

    return (
        <div className="options-bar">
            {/* <button className="option">
                <FontAwesomeIcon icon={faCog}/>
            </button> */}
        </div>
    )
}

export default ProfileOptions;
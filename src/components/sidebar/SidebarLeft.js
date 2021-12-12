import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import ProfileSb from "./ProfileSb";
import AuthForm from "../profile/AuthForm";
import './style.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream } from "@fortawesome/free-solid-svg-icons";


const SidebarLeft = () => {
    const {userStore} = useContext(Context);

    return (
        <div className='sidebar-left'>
            <div className='sb-block_container'>
                <ul className="links-list">
                    <li>
                        <Link to='/feed'>
                            <FontAwesomeIcon icon={faStream} />
                            <span>Главная</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default observer(SidebarLeft);
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

const CommentButton = ({componentData, isNavigate = true}) => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <button 
            className="open-comments" 
            onClick={() => {
                if (isNavigate) {
                    navigate(`/post/${componentData.id}`, {
                        state : {backgroundLocation : location.pathname}
                    })
                }
            }}
            >
            <div className="bpbutton_wrapper">
                <FontAwesomeIcon icon={faCommentRegular} />
                <span>{componentData.commentsCount > 0 ? componentData.commentsCount : ''}</span>                    
            </div>
        </button>
    )
}

export default CommentButton;
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react/cjs/react.development";
import { Context } from "../..";

const FeedTypeChange = () => {
    const {postStore} = useContext(Context);
    const [isChecked, setChecked] = useState(postStore.feedType == 'subs');
    const inputElement = useRef(null);

    return (
        <div className="feed-tc_container">
            <div className="input-container">
                <div 
                    className="feed-tc_label"
                    onClick={() => {
                        if (inputElement.current.checked && postStore.canChangeFeedType) {
                            postStore.setCanChangeFeedType(false);
                            setChecked(false);
                            postStore.setFeedType('all')
                        }
                    }}
                >
                    Все
                </div>
                <div className="input-wrapper">
                    <input 
                        ref={inputElement} 
                        type="checkbox" 
                        id='feedTypeChange' 
                        name='feedTypeChange' 
                        checked={isChecked}
                        disabled={!postStore.canChangeFeedType}
                        onChange={e => {
                            postStore.setCanChangeFeedType(false);

                            if (e.target.checked) postStore.setFeedType('subs')
                            else postStore.setFeedType('all')

                            setChecked(e.target.checked);
                        }}
                    />  
                    <label htmlFor="feedTypeChange"></label>
                </div>
                <div 
                    className="feed-tc_label"
                    onClick={() => {
                        if (!inputElement.current.checked && postStore.canChangeFeedType) {
                            postStore.setCanChangeFeedType(false);
                            setChecked(true);
                            postStore.setFeedType('subs')
                        }
                    }}
                >
                    Подписки
                </div>
            </div>
        </div>
    )
}

export default observer(FeedTypeChange);
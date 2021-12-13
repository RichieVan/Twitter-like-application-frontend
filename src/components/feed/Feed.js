import React, { useEffect, useContext } from 'react';
import PostForm from './PostForm.js';
import FeedPostsList from './lists/FeedPostsList.js';
import './style.css';
import { observer } from 'mobx-react-lite';
import { Context } from "../..";
import FeedTypeChange from './FeedTypeChange.js';

const Feed = () => {
    const {postStore} = useContext(Context);

    useEffect(() => {
        document.title = 'Главная';
    })

    return (
        <div className='feed'>
            <PostForm />
            <FeedTypeChange />
            <FeedPostsList key={postStore.feedType} />
        </div>
    );
}

export default observer(Feed);
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index.js';
import FormatPostText from '../../lib/formatPostText.js';
import LoadingMask from '../LoadingMask.js';
import PostComment from './PostComment.js';
import './style.css';


const CommentsList = ({postId, postOwner}) => {
    const {postStore} = useContext(Context);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (postStore.currentCommentsList.length == 0) {
            postStore.fetchComments(postId)
                .then(result => {
                    if (result.length == 0) {
                        setIsLoading(false)
                        return;
                    }

                    setComments(
                        result.map(val => {
                            let contentArray = FormatPostText(val.textContent);
                            return ( <PostComment key={val.id} postId={postId} postOwner={postOwner} data={val} contentArray={contentArray}/> );
                        })
                    );

                    setIsLoading(false);
                })
        } else {
            setIsLoading(false);
        }
    }, [])

    if (postStore.currentCommentsList.length !== comments.length) {
        setComments(
            postStore.currentCommentsList.map((val) => {
                let contentArray = FormatPostText(val.textContent);
                return ( <PostComment key={val.id} postId={postId} postOwner={postOwner} data={val} contentArray={contentArray}/> );
            })
        );
    }

    return (
        <div className='comments'>
            {isLoading ? (
                <LoadingMask cHeight={50} cWidth={50} bg='inherit' opacity={1}/>
            ) : (
                comments.length > 0 ? comments : (
                    <div className="feed-no-data">
                        <b>Здесь нет ни одного комментария :(</b>
                        <span>Будьте первыми!</span>
                    </div>
                )
            )}
        </div>
    );
}

export default observer(CommentsList);
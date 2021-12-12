import React, { useContext, useState } from "react";
import { Context } from "../..";
import LoadingMask from "../LoadingMask";

const PostLoadMore = ({action}) => {
    const {postStore} = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="load-more_container">
            <button className='feed-load-more' onClick={() => {
                setIsLoading(true);
                action()
                    .then(() => {setIsLoading(false)})
                    .catch((callback) => {callback()})
            }}>
                Загрузить еще
            </button>
            {isLoading && (
                <LoadingMask cHeight={26} cWidth={26} bg='inherit' opacity={1}/>
            )}
        </div>
    )
}

export default PostLoadMore;
import React from "react";
import LoadingCircle from '../assets/img/icons/loading.svg' ;

const LoadingMask = ({cHeight, cWidth, bg, opacity}) => {
    const styles = {
        backgroundColor : bg,
        opacity
    }

    return (
        <div className='loading-content' style={styles}>
            <LoadingCircle height={cHeight} height={cWidth}/>
        </div>
    )
}

export default LoadingMask;
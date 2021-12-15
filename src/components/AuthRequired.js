import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "..";

const AuthRequired = ({children, to = null, element = null}) => {
    const {userStore} = useContext(Context);

    if (!userStore.isAuth) {
        if (to) return (<Navigate to={to} state={{authRedirected : true}} replace/>)
        if (element) return (element)
    }

    return children;
}

export default observer(AuthRequired);
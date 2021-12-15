import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "..";

const AuthRequired = ({children, to = null, element = null}) => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();

    console.log(userStore.isAuth);
    console.log(to);
    if (!userStore.isAuth) {
        if (to) return (<Navigate to={to} state={{authRedirected : true}} replace/>)
        if (element) return (element)
    }

    return children;
}

export default AuthRequired;
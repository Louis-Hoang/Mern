import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../contexts/UserContext/UserContext";
import Axios from "axios";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const { userState, setUserState } = useUserState();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkLogIn = async () => {
        const response = await Axios.post("/auth");
        if (response.data === "Must be login first") {
            console.log(response);
            console.log("Log in please");
            setUserState(false);
            return navigate("/login");
        }
        console.log("Log in already");
        setUserState(true);
    };
    useEffect(() => {
        checkLogIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);
    return <React.Fragment>{userState ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;

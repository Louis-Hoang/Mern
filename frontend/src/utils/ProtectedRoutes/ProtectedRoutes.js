import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkLogIn = async () => {
        const response = await Axios.post("/auth");
        if (response.data === "Must be login first") {
            console.log(response);
            console.log("Log in please");
            setIsLoggedIn(false);
            return navigate("/login");
        }
        console.log("Log in already");
        setIsLoggedIn(true);
    };
    useEffect(() => {
        checkLogIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);
    return (
        <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>
    );
};
export default ProtectedRoute;

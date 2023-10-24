import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../apis/UserAPI";

export const ProtectedRoutes = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        async function status() {
            const res = await isLoggedIn();
            if (!res.auth) {
                return navigate("/login", { replace: true });
            }
        }
        status(); // Call the status function
    }, [navigate]);

    return <React.Fragment>{props.children}</React.Fragment>;
};

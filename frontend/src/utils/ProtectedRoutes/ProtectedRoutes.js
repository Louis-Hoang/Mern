import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../apis/UserAPI";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        async function status() {
            const res = await isLoggedIn();
            if (!res.status) {
                console.log("Not logged in");
                navigate("/login", { replace: true });
            }
        }

        status(); // Call the status function
    }, [navigate]);

    console.log("Rendering ProtectedRoute");
    return <React.Fragment>{props.children}</React.Fragment>;
};

export default ProtectedRoute;

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useUserState } from "../../contexts/UserContext/UserContext";
import { LoginAPI } from "../../apis/UserAPI";

export default function Login() {
    const { userState, setUserState } = useUserState();
    const navigate = useNavigate();
    const [credential, setCredential] = useState({
        username: "",
        password: "",
        email: "",
    });

    const handleChange = (evt) => {
        setCredential((currData) => {
            return {
                ...currData,
                [evt.target.name]: evt.target.value,
            };
        });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        const response = Login(credential);
        if (response) {
            setUserState(true);
            return navigate("/content", { replace: true });
        }
        setUserState(false);
        return navigate("/login");
        //revise this later
        // e.preventDefault();
        // const { username, password, email } = credential;
        // try {
        //     const response = await Axios.post("/login", {
        //         username: username,
        //         password: password,
        //         email: email,
        //     });
        //     setCredential({ username: "", password: "", email: "" });
        //     if (response.data === "Successfully Authenticated") {
        //         return navigate("/content"); //use JWT when done
        //     } else {
        //         // console.log("Not correct");
        //         return navigate("/login");
        //     }
        // } catch (e) {
        //     console.log("Error");
        //     console.log(e);
        //     setCredential({ username: "", password: "", email: "" });
        //     return navigate("/login");
        // }
    };

    useEffect(() => {
        console.log(userState);
        // if (userState) {
        //     return navigate("/content");
        // }
    }, []);
    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="Username">Username</label>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    value={credential.username}
                    autoComplete="off"
                />
                <label htmlFor="Password">Password</label>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={credential.password}
                    autoComplete="off"
                />

                <button>Login</button>
            </form>
        </div>
    );
}

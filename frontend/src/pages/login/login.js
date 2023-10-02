import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { LoginAPI } from "../../apis/UserAPI";

export default function Login({ change }) {
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
        const response = await LoginAPI(credential);
        if (response.status) {
            change(true, response.username, response.id);
            return navigate(`/${response.username}`, { replace: true }); //pass username as param
        }

        return navigate("/login");
    };

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

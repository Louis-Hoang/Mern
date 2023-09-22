import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Axios from "axios";

export default function Register() {
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
        //revise this later
        e.preventDefault();
        const { username, password, email } = credential;
        try {
            const response = await Axios.post("/login", {
                username: username,
                password: password,
                email: email,
            });
            setCredential({ username: "", password: "", email: "" });
            if (response.data === "Successfully Authenticated") {
                return navigate("/content"); //use JWT when done
            } else {
                // console.log("Not correct");
                return navigate("/login");
            }
        } catch (e) {
            console.log("Error");
            console.log(e);
            setCredential({ username: "", password: "", email: "" });
            return navigate("/login");
        }
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
                <label htmlFor="Email">Email</label>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={credential.email}
                    autoComplete="off"
                />
                <button>Add Item</button>
            </form>
        </div>
    );
}

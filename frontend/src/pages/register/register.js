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
    const handleRegistration = async (e) => {
        //REVISE THIS LATER
        e.preventDefault();
        const { username, password, email } = credential;
        try {
            const response = await Axios.post("/register", {
                username: username,
                password: password,
                email: email,
            });
            console.log(response);
            setCredential({ username: "", password: "", email: "" });
            if (response.data === "User create") {
                return navigate("/content"); //pass username
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <h1>Register Form</h1>
            <form onSubmit={handleRegistration}>
                <label htmlFor="Username">Username</label>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    value={credential.username}
                />
                <label htmlFor="Password">Password</label>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={credential.password}
                />
                <label htmlFor="Email">Email</label>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={credential.email}
                />
                <button>Add Item</button>
            </form>
        </div>
    );
}

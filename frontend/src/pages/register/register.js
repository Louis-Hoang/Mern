import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import Axios from "axios";
import { RegisterAPI } from "../../apis/UserAPI";

export default function Register({ change }) {
    const navigate = useNavigate();
    const [credential, setCredential] = useState({
        username: "",
        password: "",
        email: "",
        image: "",
    });
    const fileInputRef = useRef(null);
    const handleChange = (e) => {
        setCredential((currData) => {
            if (e.target.name === "image") {
                return {
                    ...currData,
                    image: e.target.files[0],
                };
            }
            return {
                ...currData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleRegistration = async (e) => {
        //REVISE THIS LATER
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(credential)) {
            formData.append(`${key}`, value);
        }
        try {
            const response = await RegisterAPI(formData);
            setCredential({ username: "", password: "", email: "", image: "" });
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            } //reser input field
            if (response.status) {
                change(true, credential.username, response.id);
                return navigate("/content"); //pass username
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <h1>Register Form</h1>
            <form
                className="validated-form"
                onSubmit={handleRegistration}
                encType="multipart/form-data"
            >
                <label className="form-label" htmlFor="Username">
                    Username
                </label>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    value={credential.username}
                />
                <label className="form-label" htmlFor="Password">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={credential.password}
                />
                <label className="form-label" htmlFor="Email">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={credential.email}
                />
                <div className="mb-3">
                    <div className="form-file custom-file">
                        <input
                            type="file"
                            className="form-file-input"
                            id="image"
                            name="image"
                            required
                            ref={fileInputRef}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button>Register</button>
            </form>
        </div>
    );
}

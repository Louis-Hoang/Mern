import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { RegisterAPI } from "../../apis/UserAPI";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { StyleWrapper } from "../../utils";

export const Register = ({ change }) => {
    const [validated, setValidated] = useState(false);
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
        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            const formData = new FormData();
            for (const [key, value] of Object.entries(credential)) {
                formData.append(`${key}`, value);
            }
            try {
                const response = await RegisterAPI(formData);
                setCredential({
                    username: "",
                    password: "",
                    email: "",
                    image: "",
                });
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
        }
    };
    return (
        <StyleWrapper>
            <h1>Register Form</h1>
            {/* <form
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
                    autoComplete="off"
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
                            ref={fileInputRef}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button>Register</button>
            </form> */}
            <Form
                noValidate
                validated={validated}
                onSubmit={handleRegistration}
                encType="multipart/form-data"
            >
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="username"
                        placeholder="Username"
                        name="username"
                        // id="username"
                        onChange={handleChange}
                        value={credential.username}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        // id=""
                        onChange={handleChange}
                        value={credential.password}
                        autoComplete="off"
                    />
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control
                        type="file"
                        className="form-file-input"
                        name="image"
                        ref={fileInputRef}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        // id="email"
                        onChange={handleChange}
                        value={credential.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide valid email address.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </StyleWrapper>
    );
};

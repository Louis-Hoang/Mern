import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { useState } from "react";
import { LogoutAPI } from "../apis/UserAPI";
import { Outlet, useNavigate } from "react-router-dom";

export default function Navigation({ status, change }) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await LogoutAPI();
        change(false);
        return navigate("/");
    };
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand
                        className="link_cursor"
                        onClick={() => navigate("/")}
                    >
                        MERN
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/")}>
                                Home
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            {!status.login ? (
                                <>
                                    <Nav.Link
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link>{status.username}</Nav.Link>
                                    <Nav.Link onClick={handleLogout}>
                                        Logout
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <>
                <Outlet />
            </>
        </>
    );
}

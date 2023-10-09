import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LogoutAPI } from "../../apis/UserAPI";
import { Outlet, useNavigate, useLoaderData } from "react-router-dom";

import "../../assets/Navbar.css";

export default function Navigation({ status, change }) {
    const navigate = useNavigate();
    const info = useLoaderData();
    const handleLogout = async () => {
        await LogoutAPI();
        change(false, "", null);
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
                                    {info && (
                                        <Nav.Link
                                            onClick={() =>
                                                navigate(`/${info.username}`)
                                            }
                                        >
                                            <img
                                                className="avatar-icon"
                                                src={info.thumbnail}
                                                alt=""
                                            />
                                        </Nav.Link>
                                    )}

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

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { default as Navigation } from "react-bootstrap/Navbar";
import { LogoutAPI } from "../../apis/UserAPI";
import { Outlet, useNavigate, useLoaderData } from "react-router-dom";

import "../../assets/Navbar.css";

export const Navbar = ({ status, change }) => {
    const navigate = useNavigate();
    const info = useLoaderData();
    const handleLogout = async () => {
        await LogoutAPI();
        change(false, "", null);
        return navigate("/");
    };
    const handleNav = (dir) => {
        return () => navigate(`/${dir}`);
    };
    return (
        <>
            <Navigation
                collapseOnSelect
                expand="lg"
                className="bg-body-tertiary"
            >
                <Container>
                    <Navigation.Brand
                        className="link_cursor"
                        onClick={handleNav("")}
                    >
                        MERN
                    </Navigation.Brand>
                    <Navigation.Toggle aria-controls="responsive-navbar-nav" />
                    <Navigation.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={handleNav("")}>Home</Nav.Link>
                        </Nav>
                        <Nav>
                            {!status.login ? (
                                <>
                                    <Nav.Link onClick={handleNav("login")}>
                                        Login
                                    </Nav.Link>
                                    <Nav.Link onClick={handleNav("register")}>
                                        Register
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    {info && (
                                        <Nav.Link
                                            onClick={handleNav(
                                                `${info.username}`
                                            )}
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
                    </Navigation.Collapse>
                </Container>
            </Navigation>
            <>
                <Outlet />
            </>
        </>
    );
};

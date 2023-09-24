import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUserState } from "../contexts/UserContext/UserContext";

export default function Navigation() {
    const { userState, setUserState } = useUserState();
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">MERN</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>

                    {!userState ? (
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

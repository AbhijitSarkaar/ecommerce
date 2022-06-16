import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to={"/"}>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to={"/cart"}>
                                <div
                                    style={{
                                        color: "white",
                                        marginLeft: "20px",
                                    }}
                                >
                                    Cart
                                </div>
                            </Link>
                            <Link to={"/login"}>
                                <div
                                    style={{
                                        color: "white",
                                        marginLeft: "20px",
                                    }}
                                >
                                    Sign In
                                </div>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;

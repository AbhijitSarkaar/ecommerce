import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = ({ history }) => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to={"/"}>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        style={{ alignItems: "center !important" }}
                    >
                        <Route
                            render={({ history }) => (
                                <SearchBox history={history} />
                            )}
                        ></Route>
                        <Nav style={{ alignItems: "center !important" }}>
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
                            {userInfo?.isAdmin && (
                                <Link to={"/admin/userlist"}>
                                    <div
                                        style={{
                                            color: "white",
                                            marginLeft: "20px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Users
                                    </div>
                                </Link>
                            )}
                            {userInfo?.isAdmin && (
                                <Link to={"/admin/productlist"}>
                                    <div
                                        style={{
                                            color: "white",
                                            marginLeft: "20px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Products
                                    </div>
                                </Link>
                            )}
                            {userInfo?.isAdmin && (
                                <Link to={"/admin/orderlist"}>
                                    <div
                                        style={{
                                            color: "white",
                                            marginLeft: "20px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Orders
                                    </div>
                                </Link>
                            )}
                            {userInfo ? (
                                <>
                                    <div
                                        style={{
                                            color: "white",
                                            marginLeft: "20px",
                                            cursor: "pointer",
                                        }}
                                        onClick={logoutHandler}
                                    >
                                        logout
                                    </div>
                                    <Link to={"/profile"}>
                                        <div
                                            style={{
                                                color: "white",
                                                marginLeft: "900px",
                                                width: "300px",
                                            }}
                                        >
                                            {userInfo.name}
                                        </div>
                                    </Link>
                                </>
                            ) : (
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
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;

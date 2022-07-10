import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

export default function ProfileScreen({ location, history }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    //Check if user is logged in
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login"); //checks the updated user info from redux, if info is possible it redirects to homepage
        } else {
            if (!user?.name) {
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("password", password);
        if (password && password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(
                updateUserProfile({
                    id: user._id,
                    name,
                    email,
                    password,
                })
            );
        }
    };

    console.log("orders", orders);
    console.log("render");

    return (
        <>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {error && <Message variant="danger">{error}</Message>}
                    {success && (
                        <Message variant="success">Profile Updated</Message>
                    )}
                    {message && <Message variant="danger">{message}</Message>}
                    {loading && <Loader></Loader>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant={"danger"}>Error Orders</Message>
                    ) : (
                        orders &&
                        orders.length > 0 && (
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                className="table-sm"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders &&
                                        orders.map((order) => {
                                            return (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>
                                                        {order.createdAt.substring(
                                                            0,
                                                            10
                                                        )}
                                                    </td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>
                                                        {order.isPaid ? (
                                                            order.paidAt.substring(
                                                                0,
                                                                10
                                                            )
                                                        ) : (
                                                            <i
                                                                className="fas fa-times"
                                                                style={{
                                                                    color: "red",
                                                                }}
                                                            ></i>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {order.isDelivered ? (
                                                            order.deliveredAt.substring(
                                                                0,
                                                                10
                                                            )
                                                        ) : (
                                                            <i
                                                                className="fas fa-times"
                                                                style={{
                                                                    color: "red",
                                                                }}
                                                            ></i>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/order/${order._id}`}
                                                        >
                                                            <Button
                                                                variant="light"
                                                                className="btn-sm"
                                                            >
                                                                Details
                                                            </Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </Table>
                        )
                    )}
                </Col>
            </Row>
        </>
    );
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
    FormGroup,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
    listProductDetails,
    createProductReview,
} from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );

    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = useSelector((state) => state.productReviewCreate);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successProductReview) {
            alert("Review Submitted!");
            setRating(0);
            setComment("");
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET,
            });
        }

        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        );
    };

    return (
        <>
            <Link className="btn btn-light my-3" to={"/"}>
                Go Back
            </Link>
            {loading ? (
                <Loader></Loader>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            ></Image>
                        </Col>
                        <Col md={3}>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                ></Rating>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>
                                                    {product.countInStock > 0
                                                        ? "In stock"
                                                        : "Out of stock"}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className="btn-block"
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                        >
                                            Add to cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && (
                                <Message>No reviews</Message>
                            )}
                            <ListGroup variant="flush">
                                {product.reviews.map((review) => {
                                    return (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating
                                                value={review.rating}
                                            ></Rating>
                                            <p>
                                                {review.createdAt.substring(
                                                    0,
                                                    10
                                                )}
                                            </p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                            <ListGroup.Item>
                                <h2>Write a Customer Review </h2>
                                {errorProductReview && (
                                    <Message variant="danger">
                                        {errorProductReview}
                                    </Message>
                                )}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label> Rating</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={(e) =>
                                                    setRating(e.target.value)
                                                }
                                            >
                                                {[0, 1, 2, 3, 4].map((x) => (
                                                    <option
                                                        key={x + 1}
                                                        value={x + 1}
                                                    >
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                row="3"
                                                value={comment}
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button type="submit" variant="primary">
                                            Submit
                                        </Button>
                                    </Form>
                                ) : (
                                    <Message>
                                        Please <Link to="/login">login</Link> to
                                        write a review
                                    </Message>
                                )}
                            </ListGroup.Item>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;

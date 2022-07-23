import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

const HomeScreen = ({ match }) => {
    const { keyword } = match.params;
    const pageNumber = match.params.pageNumber || 1;
    const { loading, error, products, page, pages } = useSelector(
        (state) => state.productList
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);
    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader></Loader>
            ) : error ? (
                <Message variant={"danger"}>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col sm={12} md={4} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ""}
                    ></Paginate>
                </>
            )}
        </>
    );
};

export default HomeScreen;

import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("/api/products").then((res) => setProducts(res.data));
    }, []);
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col sm={12} md={4} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;

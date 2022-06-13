import React from "react";
import { products } from "../products";
import { Card, Col, Row } from "react-bootstrap";

const HomeScreen = () => (
    <>
        <h1>Latest Product</h1>
        <Row>
            {products.map((product) => (
                <Col sm={12} md={4} lg={4} xl={3}>
                    <Card.Img src={product.image} variant="top"></Card.Img>
                </Col>
            ))}
        </Row>
    </>
);

export default HomeScreen;

import React from "react";
import { Card } from "react-bootstrap";
import one from "../images/first.jpg";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${product._id}`}>
                <Card.Img src={one} variant="top"></Card.Img>
            </a>
        </Card>
    );
};

export default Product;

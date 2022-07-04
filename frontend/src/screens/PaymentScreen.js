import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentScreen({ history }) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (Object.keys(shippingAddress).length === 0) history.push("/shipping");

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Paypal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="Paypal"
                            checked
                            onChange={(e) => savePaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Stripe"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            checked
                            onChange={(e) => savePaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

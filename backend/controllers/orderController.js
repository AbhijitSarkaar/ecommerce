import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc     Create new order
//@route    POST /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPricem,
        totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
        return;
    } else {
        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPricem,
            totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201);
        res.json(createdOrder);
    }
});

//@desc     Get order by ID
//@route    GET /api/orders/:id
//@access   Private

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

//@desc     Update order to paid
//@route    GET /api/orders/:id/pay
//@access   Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        //updating the payment info into the database
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

//@desc     Get logged in user's orders
//@route    GET /api/orders/myorders
//@access   Private

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({
        user: req.user._id, //user property is added in the auth middleware
    });
    res.json(orders);
});

//@desc     Get all orders
//@route    GET /api/orders
//@access   Private/Admin

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name"); //get id and name of user
    res.json(orders);
});

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
};

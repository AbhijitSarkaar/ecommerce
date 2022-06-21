import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("API is running");
});

app.get("/api/products", (req, res) => {
    console.log("api here");
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    console.log(req.params.id);
    const [product] = products.filter(
        (item) => item._id === Number(req.params.id)
    );
    console.log(product);
    res.json(product);
});

const PORT = process.env.PORT;
app.listen(
    PORT || 5000,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.blue
            .underline
    )
);

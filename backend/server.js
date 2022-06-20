const express = require("express");
const products = require("./data/products");

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

app.listen(5000, console.log("Server running on port 5000"));

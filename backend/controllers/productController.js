import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc     Fetch all products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}); //get all the documents
    res.json(products);
});

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.find({ _id: req.params.id });
    if (product) {
        res.json(product[0]);
    } else {
        res.status(404);
        throw new Error(`Product not found `);
    }
});

//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "Product Removed" });
    } else {
        res.status(404);
        throw new Error(`Product not found `);
    }
});

//@desc     Create a product
//@route    POST /api/products
//@access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpeg",
        brand: "Sample brand",
        category: "Sample Category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
        req.body; //get the data from request
    const product = await Product.findById(req.params.id); //get the document from db
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
};

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization;
            const decoded = jwt.verify(
                token.split(" ")[1],
                process.env.JWT_SECRET
            );
            const { id } = decoded;
            req.user = await User.findById(id).select("-password"); //not including password
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, Token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized, Token not found");
    }
});

export { protect };

//import modules
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// protect routes
const protect = asyncHandler(async (req, res, next) => {
    // get token from request
    let token;

    // get token from cookie
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    // check if token exists
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token.");
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // get user from database
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed.");
    }

});

// export module
export { protect };
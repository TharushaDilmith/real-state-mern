//imports modules
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// Desc: Auth user
// Route: POST /api/users/auth
// Access: Public
const authUser = asyncHandler(async (req, res) => {
    //get data from request body
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    //if user exists, check if password is correct
    if (user && (await user.matchPassword(password))) {
        //generate token
        generateToken(res, user._id);
        //send response
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password.');
    }
});

// Desc: Register user
// Route: POST /api/users/register
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
    //get data from request body
    const { name, email, password } = req.body;
    //check if user exists
    const userExists = await User.findOne({ email });
    //if user exists, throw an error
    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }
    //create new user
    const user = await User.create({
        name,
        email,
        password
    });
    //if user is created, send a response
    if (user) {
        //generate token
        generateToken(res, user._id);
        //send response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// Desc: Logout user
// Route: GET /api/users/logout
// Access: Private
const logoutUser = asyncHandler(async (req, res) => {
    //clear cookie
    res.cookie('token', 'none', {
        expires: new Date(0),
        httpOnly: true
    });
    //send response
    res.status(200).json({
        message: 'User logged out.'
    });
});

//export controllers
export {
    authUser,
    registerUser,
    logoutUser
}
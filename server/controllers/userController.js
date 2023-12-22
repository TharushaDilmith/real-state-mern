//imports modules
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Desc: Get user profile
// Route: GET /api/users/profile
// Access: Private
const getUserProfile = asyncHandler(async (req, res) => {
    //get user from database
    const user = await User.findById(req.user._id);
    //if user exists, send response
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
});

//export controllers
export {
    getUserProfile,
}
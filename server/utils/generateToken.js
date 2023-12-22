//import module
import jwt from "jsonwebtoken";

// Create function to generate token
const generateToken = (res, id) => {
    // Create token
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    // Send cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400000,
    });
};

// Export module
export default generateToken;
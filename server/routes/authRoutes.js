// import modules
import express from 'express';

//create express router
const router = express.Router();

//import controller
import {authUser, registerUser, logoutUser} from '../controllers/authController.js';

//import middleware
import {protect} from '../middleware/authMiddleware.js';

//define routes
router.post('/login',authUser);
router.post('/register', registerUser);
router.post('/logout', protect, logoutUser);

//export router
export default router;
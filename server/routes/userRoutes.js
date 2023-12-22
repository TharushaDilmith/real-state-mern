// import modules
import express from 'express';

//create express router
const router = express.Router();

//import controller
import { getUserProfile } from '../controllers/userController.js';

//import middleware
import { protect } from '../middleware/authMiddleware.js';

//define routes
router.get('/profile', protect, getUserProfile);

//export router
export default router;
const express = require('express');
const router = express.Router();
const { 
    registerUser,
    loginUser,
    getMe
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // Inccludes the protect middleware to enable user authorization

module.exports = router;
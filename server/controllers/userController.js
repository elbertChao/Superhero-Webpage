const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @Desc Register a new user
// @Route POST /api/users
// @Access Public
const registerUser = asyncHandler(async (req, res) => {
    const { nickname, email, password } = req.body;

    // Make sure user fills out all fields for registration
    if (!email) {
        res.status(400);
        throw new Error('Please enter an email!');
    } else if (!password) {
        res.status(400);
        throw new Error('Please enter a password!');
    } else if (!nickname || !email || !password){
        res.status(400);
        throw new Error('Please fill all fields!');
    }

    // Check if the user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists!');
    }

    // Hashing password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating user
    const user = await User.create({
        nickname,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            nickname: user.nickname,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data!');
    }
});

// @Desc Authenticate a user
// @Route POST /api/users/login
// @Access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Checking for user's email
    const user = await User.findOne({ email });

    // Using bcrypt.compare to compare non hashed password to hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            nickname: user.nickname,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid login info!');
    }
});

// @Desc Get user data
// @Route GET /api/users/me
// @Access Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// Generate JWT
// , user for later for admin *********************************************
const generateToken = (id) => {
    // Set the ID to 'id'
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
        // isAdmin: user.isAdmin,
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
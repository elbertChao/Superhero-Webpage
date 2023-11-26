const jwt = require ('jsonwebtoken');
const asyncHandler = require ('express-async-handler');
const User = require ('../models/userModel');

// Protecting users, used for verification
const protect = asyncHandler (async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') // Makes sure token starts with 'Bearer'
        ) {
        try {
            // getting token from the header
            // token is like: 'Bearer token'
            // so then it just RETURNS THE TOKEN, not the 'Bearer' part
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token, removes the hashed password
            req.user = await User.findById(decoded.id).select('-password');
            
            // Calls the next piece of middleware
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized!');
        }
    }

    if (!token) { // No token is found
        res.status(401);
        throw new Error('Not authorized, no token!');
    }
});

module.exports = { protect };
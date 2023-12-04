// Importing Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Defining the user schema using the Mongoose Schema constructor
const userSchema = mongoose.Schema({
    // Defining the nickname field in the user schema
    nickname: {
        type: String, // Data type for the nickname field (String)
        required: [true, 'Please enter a nickname'] // Validation rule: It is required, and an error message if not provided
    },
    // Defining the email field in the user schema
    email: {
        type: String, // Data type for the email field (String)
        required: [true, 'Please enter an email'], // Validation rule: It is required, and an error message if not provided
        unique: true // Validation rule: It must be unique across all users
    },
    // Defining the password field in the user schema
    password: {
        type: String, // Data type for the password field (String)
        required: [true, 'Please enter a password'] // Validation rule: It is required, and an error message if not provided
    },
},
{
    timestamps: true // Adding timestamps to track when the document is created and modified
});

// Exporting the Mongoose model based on the user schema
module.exports = mongoose.model('User', userSchema);

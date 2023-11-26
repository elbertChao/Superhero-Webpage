const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: [true, 'Please enter a nickname']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
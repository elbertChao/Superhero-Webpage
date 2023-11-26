const mongoose = require('mongoose');

const listSchema = mongoose.Schema(
{
    // Shows which user created the list
    user: {
        // Users are going to be of type ObjectId in the db
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // References the 'User' model in userModel.js
    },
    text: {
        type: String,
        required: [true, 'Please add text value!']
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('List', listSchema);
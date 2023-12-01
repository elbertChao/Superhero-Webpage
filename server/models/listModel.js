const mongoose = require('mongoose');

const listSchema = mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add text value!']
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('List', listSchema);

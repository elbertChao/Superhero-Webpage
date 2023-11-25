const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add text value!']
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('List', listSchema);
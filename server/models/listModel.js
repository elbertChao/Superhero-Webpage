const mongoose = require('mongoose');

const listSchema = mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a list name!'],
        unique: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'private'
    },
    heroes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Superhero'
        }
      ]
}, {
    timestamps: true,
});

module.exports = mongoose.model('List', listSchema);

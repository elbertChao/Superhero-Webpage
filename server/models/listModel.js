const mongoose = require('mongoose');

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    superheroIds: {
      type: [String], // Assuming superheroIds are strings, adjust if they are a different type
      required: [true, 'Please add superhero IDs'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('List', listSchema);

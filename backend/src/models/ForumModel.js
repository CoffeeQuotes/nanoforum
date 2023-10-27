const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  num_topics: {
    type: Number, 
    default: 0
  },
  num_replies: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  }
});

const Forum = mongoose.model('Forum', ForumSchema);

module.exports = Forum;

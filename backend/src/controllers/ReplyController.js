const {validationResult } = require('express-validator');

// import model 
const Reply = require('./../models/ReplyModel');
const User = require('./../models/UserModel');
// Create Reply admin
exports.createReply = async(req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ data: { errors: errors.array().map(error => error.msg) }});
  }

  const reply = new Reply({
      content: req.body.content,  
      user_id: req.body.user_id,
      forum_id: req.body.forum_id,
      post_id: req.body.post_id
  });

  try {
    await reply.save();
    return res.status(201).json({ data: { message: 'Successfully created reply'}});
  } catch (error) {
    console.log(error);
    return res.status(501).json({ data: { errors: ["Failed to create reply"] } });
  }
};

// Get post's reply
exports.getPostReplies = async (req, res) => {
    try {
        const replies = await Reply.find({post_id: req.params.post_id});
        const replyWithUsers = await Promise.all(replies.map(async (reply) => {
            const user = await User.findById(reply.user_id);
            return { ...reply.toObject(), user }; // Merge reply data with user data
        }));

        return res.status(200).json({ data: replyWithUsers });
    } catch(error) {
        console.log(error);
        return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
    }
}


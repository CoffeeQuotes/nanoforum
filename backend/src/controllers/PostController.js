const {validationResult } = require('express-validator');

const Post = require('./../models/PostModel');
// Get all the Posts 
exports.indexPosts = async (req, res) => {
    try {
      const posts = await Post.find({}).sort({timestamps: -1}).limit(5);
      return res.status(200).json({ data: posts });
    } catch (error) {
      console.log(error);
      return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
    }
  };
  
// Create a new Post 
exports.createPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ data: { errors: errors.array().map(error => error.msg) }});
  }

  const post = new Post({
    title: req.body.title,
    subject: req.body.subject,
    message: req.body.message,
    user_id: req.body.user_id,
    is_sticky: req.body.is_sticky, 
    is_locked: req.body.is_locked,
    forum_id: req.body.forum_id
  });

  try {
    await post.save();
    return res.status(201).json({ data: { message: 'Successfully created post'}});
  } catch (error) {
    console.log(error);
    return res.status(501).json({ data: { errors: ["Failed to create post"] } });
  }
};

// Get Post by user 
exports.getPostsByUser = async (req, res) => {
   try {
      const posts = await Post.find({user_id: req.params.user_id});
      console.log(posts);
      return res.status(200).json({ data: posts });
   } catch(error) {
      console.log(error);
      return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
   }
}

exports.getForumPosts = async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;

        const posts = await Post.find({forum_id: req.params.forum_id}).skip(offset).limit(limit).sort({ timestamps: -1 });
        return res.status(200).json({ data: posts });
    } catch(error) {
        console.log(error);
        return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
    }
}

// getPostsById
exports.getPostsById = async (req, res) => {
    try {
        const id = req.params._id;
        const posts = await Post.findById(id);
        // console.log(posts);
        return res.status(200).json({ data: posts });
    } catch(error) {
        console.log(error);
        return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
    }
}
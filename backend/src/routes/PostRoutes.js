const express = require('express');
const {validatePost} = require('./../validations/PostValidations');
const PostController = require('./../controllers/PostController');
const router = express.Router();

router.get('/', PostController.indexPosts);
router.get('/users/:user_id', PostController.getPostsByUser);
router.get('/:_id', PostController.getPostsById);
router.get('/forum/:forum_id', PostController.getForumPosts);
router.post('/',  validatePost(), PostController.createPost); 

module.exports = router;
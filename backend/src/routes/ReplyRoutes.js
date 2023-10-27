const express = require('express');
const {validateReply} = require('./../validations/ReplyValidations');
const ReplyController = require('./../controllers/ReplyController');
const router = express.Router();

// router.get('/', ForumController.indexForums);
// router.get('/:_id', ForumController.getForumsByUser);
router.post('/',  validateReply(), ReplyController.createReply); 
router.get('/post/:post_id', ReplyController.getPostReplies)
module.exports = router;
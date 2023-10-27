const express = require('express');
const {validateForum} = require('./../validations/ForumValidations');
const ForumController = require('./../controllers/ForumController');
const router = express.Router();

router.get('/', ForumController.indexForums);
router.get('/:_id', ForumController.getForumById);
router.post('/',  validateForum(), ForumController.createForum); 

module.exports = router;
const express = require('express');
const {validateUser} = require('./../validations/UserValidations');
const UserController = require('./../controllers/UserController');
const router = express.Router();

router.get('/', UserController.indexPosts);
router.post('/',  validateUser(), UserController.createUser); 
router.get('/:_id', UserController.getUserByProfile);
router.post('/login', UserController.userLogin);
module.exports = router;
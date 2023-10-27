const { check } = require('express-validator')

const validatePost = () => [
    check("title").not().isEmpty().withMessage('title field value cannot empty'),
    check("subject").not().isEmpty().withMessage('subject field value cannot empty'),
    check("message").not().isEmpty().withMessage('message field value cannot empty'),
    check("user_id").not().isEmpty().withMessage('user Id field value cannot empty'),
    check("forum_id").not().isEmpty().withMessage('forum Id field value cannot empty')
];

module.exports = {validatePost};
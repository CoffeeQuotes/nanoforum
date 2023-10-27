const { check } = require('express-validator')

const validateReply = () => [
    check("forum_id").not().isEmpty().withMessage('forum id field value cannot empty'),
    check("user_id").not().isEmpty().withMessage('user id field value cannot empty'),
    check("post_id").not().isEmpty().withMessage('post id field value cannot empty'),
    check("content").not().isEmpty().withMessage('user id field value cannot empty'),
];

module.exports = {validateReply};
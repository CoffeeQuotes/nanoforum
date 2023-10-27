const { check } = require('express-validator')

const validateForum = () => [
    check("name").not().isEmpty().withMessage('name field value cannot empty'),
    check("description").not().isEmpty().withMessage('description field value cannot empty')
];

module.exports = {validateForum};
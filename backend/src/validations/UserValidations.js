const { check } = require('express-validator')

const validateUser = () => [
    check("firstname").not().isEmpty().withMessage('firstname field value cannot empty'),
    check("lastname").not().isEmpty().withMessage('lastname field value cannot empty'),
    check("email").not().isEmpty().withMessage('Email cannot be blank').isEmail().withMessage('Please provide genuine email'),
    check("password").not().isEmpty().withMessage('password field value cannot empty').isLength({min: 5}).withMessage("Password must be minimum 5 characters"),
    check("confirm_password").not().isEmpty().matches('password').withMessage("Password do not match.")
];

module.exports = {validateUser};
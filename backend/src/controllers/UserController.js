const { validationResult } = require('express-validator');
const User  = require('./../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all users 
exports.indexPosts = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ data: users });
    } catch (error) {
        console.log(error);
        return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
    }
}
// SignUp a new user
exports.createUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ data: { errors: errors.array().map(error => error.msg) }});
    }
    const saltRounds =  10;
    const plainTextPassword = req.body.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(plainTextPassword, salt);

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      bio: req.body.bio,
      email: req.body.email,
      password: hashPassword,
      dob: req.body.dob
    });
  
    try {
      await user.save();
      return res.status(201).json({ data: { message: 'Successfully created user' } });
    } catch (error) {
      console.log(error);
      return res.status(501).json({ data: { errors: ["Failed to create user"] } });
    }
  };

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    const data = {
        user,
        token
    }
    res.status(200).json({ data });
}

exports.getUserByProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        return res.status(200).json({ data: user});
    } catch (error) {
        console.log(error);
        return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
    }
}
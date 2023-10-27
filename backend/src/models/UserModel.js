const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String, 
        required: true,
    },
    bio: {
        type: String, 
    },
    email: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    }, 
    timestamps: {
        type: Date, 
        default: Date.now(),
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
    isGold: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isGold: this.isGold}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isGold: Joi.boolean().required()
    })
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser; 
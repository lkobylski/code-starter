'use strict';

const Mongoose = require('mongoose');
const crypto = require('crypto');
const Joi = require('joi');

const _passwordMinLength = 4;

/**
 * A Validation function for local strategy password
 */
const validateLocalStrategyPassword = function (password) {
    const passwordSchema = Joi.string().min(_passwordMinLength);
    const validate = Joi.validate(password, passwordSchema);
    return validate.error == null;
};

const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: [validateLocalStrategyPassword, "Please file right e-mail address"]
    },
    password: {
        type: String,
        required: true,
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    firstName: {
        type: String,
        trim: true,
        default: ''
        //validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
        //validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    articles: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ],
    displayName: {
        type: String,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    salt: {
        type: String
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    token: {
        type: String
    }

}, {
    timestamps: true
});

/**
 * Hash password
 */
UserSchema.pre('save', function (next, done) {

    if (this.password && this.isModified('password') && this.password.length >= _passwordMinLength) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    this.token = crypto.randomBytes(16).toString('base64');

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password, callback) {
    callback = callback || function () {
        };

    let isMatch = this.password === this.hashPassword(password);

    callback(null, isMatch);
};

const UserModel = Mongoose.model('User', UserSchema);

module.exports = UserModel;
'use strict';

const Joi = require('joi');
const Boom = require('boom');
const User = require('../entity/user');
const Config = require('../../../config');
const Jwt = require('jsonwebtoken');

const _privateKey = Config.key.privateKey;

exports.read = {
    description: "Show logged user profile",
    //auth: true,
    handler: function (request, reply) {
        return reply(request.auth.credentials);
    }
};

exports.login = {
    auth: false,
    description: "User login",
    validate : {
        payload : {
            email : Joi.string().required(),
            password: Joi.string().required()
        }
    },
    handler(request, reply) {

        User.findOne({
            email: request.payload.email
        }, (err, user) => {
            if (err) {
                return reply(Boom.forbidden(err))
            }

            if (!user) {
                return reply(Boom.unauthorized('Authentication failed. User not found'));
            } else {
                user.authenticate(request.payload.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        let tokenData = {
                            id: user._id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName
                        };

                        let token = Jwt.sign(tokenData, _privateKey);

                        return reply({success: true, token: token, userData : {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        }})
                    } else {
                        return reply(Boom.unauthorized('Authentication failed. Wrong username or password'));
                    }
                });
            }
        })
    }

}

exports.register = {
    auth: false,
    description: 'User register',
    validate: {
        payload: {
            firstName   : Joi.string().required(),
            lastName    : Joi.string().required(),
            email       : Joi.string().email().required(),
            password    : Joi.string().required().min(4),
            passwordConfirm: Joi.string()
        }
    },
    handler : function(request, reply) {
        let user = new User(request.payload);

        user.save((err, user) =>  {
            if(err) {
                if (11000 === err.code || 11001 === err.code) {
                    return reply(Boom.notAcceptable("Used email already exist."));
                } else {
                    return reply(Boom.notAcceptable(err.errmsg))
                }

                return reply(Boom.badRequest(err));
            }

            return reply(user);
        });

    }
};
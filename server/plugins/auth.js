/**
 * Auth hapi plugin
 */


const HapiAuthJwt = require('hapi-auth-jwt2');
const config = require('../config');
const Moment = require('moment');
const UserModel = require('../routes/user/entity/user');



function validate(decoded, token, cb) {
    let ttl = config.key.tokenExpiration;
    let diff = Moment().diff(Moment(decoded.iat * 1000));


    if (diff > ttl) {
        return cb(null, false);
    }

    UserModel.findOne({_id: decoded.id}, (err, user) => {
        if (err) {
            return cb(err, false);
        } else if (!user) {
            return cb(null, false);
            //} else if (user.isVerified) {
        } else if (user) {
            return cb(null, true, user);
        } else {
            return cb(null, false);
        }
    });

}

// Auth jwt plugin
const register = (server, options, next) => {
    server.register(HapiAuthJwt, (err) => {
        if (err) {
            return next(err);
        }

        server.auth.strategy('jwt', 'jwt', {
            key: config.key.privateKey,
            validateFunc: validate
        });

        server.auth.default('jwt');

        return next();
    });
};

register.attributes = {
    name: 'auth-jwt',
    version: '1.0.0'
};

module.exports = register;
const Mongoose = require('mongoose');
const Joi = require('joi');
const Hoek = require('hoek');

const internals = {
    schema: Joi.object({
        mongooseUri: Joi.string().uri().required(),
        mongooseOptions: Joi.object()
    }),
    defaults: {
        mongooseOptions: {}
    }
};

const register = (server, options, next) => {
    options = Hoek.applyToDefaults(internals.defaults, options);
    let results = Joi.validate(options, internals.schema);
    Hoek.assert(!results.error, results.error);
    let settings = results.value;

    Mongoose.Promise = global.Promise;

    Mongoose.connect(settings.mongooseUri, settings.mongooseOptions, function (err) {

        Hoek.assert(!err, err);

        let connection = Mongoose.connection;
        let log = `Database ${connection.name} connected on ${connection.host}:${connection.port}.`;


        server.log(['db-mongo-connect', 'plugin'], log);
        console.log(log);


        server.on('stop', function () {
            server.log(['db-mongo-connect', 'plugin'], 'Database `' + connection.name + '` closed');
            connection.close();
        });

    });

    next();
}

register.attributes = {
    name: 'db-mongo',
    version: '1.0.0'
};


module.exports = register;
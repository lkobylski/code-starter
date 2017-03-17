'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Hoek = require('hoek');

const Config = require('./config');

const server = new Hapi.Server();
const plugins = [];
const routes = require('./routes');

server.connection({
    port: Config.server.port,
    routes: {
        cors: true,
        files: {
            relativeTo: Path.join(__dirname, '../', 'public')
        }
    }
});

let mongoOptions = {
    user: Config.database.username,
    pass: Config.database.password,
    promiseLibrary: global.Promise
};

if (Config.database.options) {
    mongoOptions = Object.assign(mongoOptions, Config.database.options)
}

plugins.push({
    register: require('./plugins/db'),
    options: {
        mongooseUri: `mongodb://${Config.database.host}:${Config.database.port}/${Config.database.db}`,
        mongooseOptions: mongoOptions
    }
});

plugins.push(require('./plugins/auth'));
plugins.push(require('vision'));
plugins.push(require('inert'));


server.register(plugins, (err) => {

    if (err) {
        throw err;
    }


    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './templates',
        layout: true,
        layoutPath: './templates/layout',
        helpersPath: './templates/helpers'
    });

    server.route({
        method: 'GET',
        path: '/js/{filename}',
        config: {
            auth: false,
        },
        handler: {
            file: function (request) {
                return __dirname + '/../public/js/' + request.params.filename;
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/css/{filename}',
        config: {
            auth: false,
        },
        handler: {
            file: function (request) {
                return __dirname + '/../public/css/' + request.params.filename;
            }
        }
    });

    server.route(routes);

});

module.exports = server;
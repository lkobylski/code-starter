'use strict';

//const FooRoute = require('./api/foo/routes');
const UserRoute = require('./user/routes');
const ArticleRoute = require('./articles/routes');


let routes = [
    {
        path: '/',
        method: 'GET',
        config: {
            description : "Serve VUE.js app.",
            auth: false
        },
        handler: function (request, reply) {
            reply.view('index/index');
        }
    }
];

module.exports = routes
    .concat(UserRoute)
    .concat(ArticleRoute);

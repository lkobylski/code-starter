'use strict';

module.exports = {
    server : {
        port: 3000
    },
    database: {
        "host": "127.0.0.1",
        "port": 27017,
        "db": "code-starter",
        "username": "",
        "password": ""
    },
    key: {
        privateKey: "secretKey123",
        tokenExpiration: 28800000,
        tokenExpirationDescription: "8 hour"
    },
};

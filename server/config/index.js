const _ = require('lodash');
const glob = require('glob');
const fs = require('fs');


if(typeof (process.env.NODE_ENV) == 'undefined') {
    process.env.NODE_ENV = 'production';
}

let resolvingConfig = function () {

    let conf = _.extend(
        require('./env/all'),
        require('./env/' + process.env.NODE_ENV) || {}
    );

    return _.merge(conf, (fs.existsSync('./config/env/local.js') && require('./env/local.js')) || {});
};

module.exports = resolvingConfig();
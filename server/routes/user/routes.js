const UserController = require('./controller/user.controller');

module.exports = [
    {path: '/api/user', method: 'GET', config : UserController.read},
    {path: '/api/user/register', method: 'POST', config : UserController.register},
    {path: '/api/user/login', method: 'POST', config : UserController.login}
];
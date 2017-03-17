const ArticleController = require('./controller/article.controller');

module.exports = [
    //{path: '/api/user', method: 'GET', config : UserController.read},
    {path: '/api/article', method: 'POST', config : ArticleController.create},
    {path: '/api/article', method: 'GET', config : ArticleController.list},
    {path: '/api/article/{articleId}', method: 'GET', config : ArticleController.read},
    {path: '/api/article/{articleId}', method: 'POST', config : ArticleController.update},
    {path: '/api/article/{articleId}', method: 'DELETE', config : ArticleController.delete}
];
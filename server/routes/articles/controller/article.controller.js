'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Article = require('../entity/article');

exports.create = {
    description: "Create Article",

    validate: {
        payload: {
            title: Joi.string().required(),
            content: Joi.string().required()
        }
    },
    handler: function (request, reply) {

        let article = new Article(request.payload);

        article.user = request.auth.credentials;
        console.log(article);

        article.save((err) => {
            if (err) {
                return reply(Boom.badRequest(err))
            }

            return reply(article);
        });

    }
};

exports.read = {
    description: "Articles list",
    handler: function (request, reply) {
        Article.findOne({
            _id: request.params.articleId
        })
            .populate('user', '_id firstName lastName email')
            .exec((err, results) => {
                if (err) {
                    return reply(Boom.badRequest(err));
                }

                return reply(results);
            });
    }
};

exports.update = {
    description: "Update article",
    handler: function (request, reply) {
        Article.findOneAndUpdate({
                _id: request.params.articleId,
                user: request.auth.credentials
            }, request.payload)
            .populate('user', '_id firstName lastName email')
            .exec((err, article) => {
                if (err) {
                    return reply(Boom.badRequest(err));
                }

                return reply(article);
            });
    }
};

exports.list = {

    description: "Articles list",
    handler: function (request, reply) {
        Article.find()
            .populate('user', '_id firstName lastName email')
            .sort('-createdAt')
            .exec((err, results) => {
                if (err) {
                    return reply(Boom.badRequest(err));
                }

                return reply(results);
            });
    }

};

exports.delete = {
    description: "Remove article",

    handler: function (request, reply) {

        Article.findById(request.params.articleId)
            .where({user: request.auth.credentials})
            .exec(function (err, article) {
                "use strict";

                if (err) {
                    return reply(Boom.badRequest(err))
                }

                if (article) {
                    article.remove();
                    return reply({success: true});
                } else {
                    return reply(Boom.badRequest("Not article found."))
                }

            });
    }
}


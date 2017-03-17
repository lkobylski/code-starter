'use strict';

const Mongoose = require('mongoose');
const Joi = require('joi');
const User = require('../../user/entity/user');

const ArticleSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Mongoose.Schema.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});


ArticleSchema.post('remove', function(article) {
    User.findById(article.user, function(err, user){
        user.articles.pull(article);
        user.save();
    })
})


const ArticleModel = Mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;
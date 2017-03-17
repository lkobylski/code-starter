import articleService from 'services/article';
import moment from 'moment';


export default {

    data: () => ({
        articles: []
    }),

    components: {
        VLayout: require('layouts/default/default.vue')
    },

    methods: {

        moment () {
            return moment();
        },

        remove (article) {

            articleService.delete(article._id)
                .then((result) => {
                    this.articles.splice(this.articles.indexOf(article), 1);
                });


        }
    },

    created () {
        articleService.list()
            .then((articles) => {
                this.articles = articles;
            })
            .catch(err => {});
    },


}
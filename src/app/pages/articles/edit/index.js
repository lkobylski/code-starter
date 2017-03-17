import articleService from 'services/article';
import articleTransformer from 'transformers/article';

export default {

    data() {
        return {
            article: {
                _id: null,
                title: null,
                content: null,
                user: null
            },
        };
    },

    methods: {
        save(article) {
            article = articleTransformer.fetch(article);
            articleService.update(this.$route.params.id, article)
                .then(result => {
                    this.$router.push({
                        name: 'articles.index',
                    });
                });
        },
    },

    components: {
        VLayout: require('layouts/default/default.vue'),
        //VPanel: require('components/panel/panel.vue'),
    },

    created () {
        articleService.get(this.$route.params.id)
            .then((article) => {
                this.article= article;
            })
            .catch(err => {});
    }
}
import articleService from 'services/article';

export default {

    data() {
        return {
            article: {
                title: null,
                content: null
            },
        };
    },

    methods: {
        save(article) {
            articleService.create(article)
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
}
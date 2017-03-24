import articleService from 'services/article';
import FormError from '../../../components/form/FormError';

export default {

    data() {
        return {
            error: null,
            article: {
                title: null,
                content: null
            }
        };
    },

    methods: {

        save(article) {
            articleService.create(article)
                .then(result => {
                    this.error = null;
                    this.$router.push({
                        name: 'articles.index',
                    });
                })
                .catch((err) => {

                    if(err.message && err.validation.keys.length){
                        let error = new FormError(err.validation.keys[0], err.message);
                        this.error = error;
                        this.$emit('hasError');
                    } else {
                        console.error(err);
                    }


                });
        },
    },

    components: {
        VLayout: require('layouts/default/default.vue'),
        //VPanel: require('components/panel/panel.vue'),
    },
}
import articleService from 'services/article';
import FormError from '../../../components/form/FormError';
import formErrors from './../../../mixins/formErrors';


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

    mixins: [
        formErrors,
    ],
    methods: {

        save(article) {
            this.errors = {};

            articleService.create(article)
                .then(result => {
                    this.errors = {};
                    this.$router.push({
                        name: 'articles.index',
                    });
                })
                .catch((err) => {

                    if(err.message && err.validation.keys.length){
                        let error = new FormError(err.validation.keys[0], err.message);
                        this.$set(this.errors, error.field, error);

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
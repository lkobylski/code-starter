
import authService from './../../../services/auth';
import FormError from '../../../components/form/FormError';
import formErrors from './../../../mixins/formErrors';

export default {

    data() {
        return {
            error: null,
            user: {
                email: null,
                password: null,
            },
        };
    },
    mixins: [
        formErrors,
    ],
    methods: {
        register(user) {
            this.errors = {};
            authService.login(user)
                .catch( (err) => {

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
        VLayout: require('layouts/simple/simple.vue'),
        //VPanel: require('components/panel/panel.vue'),
    },
};
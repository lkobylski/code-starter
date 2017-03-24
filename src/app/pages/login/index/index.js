
import authService from './../../../services/auth';
import FormError from '../../../components/form/FormError';

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

    methods: {
        register(user) {
            console.log('Login user');
            console.log(user);
            authService.login(user)
                .catch( (err) => {


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
        VLayout: require('layouts/simple/simple.vue'),
        //VPanel: require('components/panel/panel.vue'),
    },
};
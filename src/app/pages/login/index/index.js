
import authService from './../../../services/auth';

export default {

    data() {
        return {
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
            authService.login(user);
        },
    },

    components: {
        VLayout: require('layouts/simple/simple.vue'),
        //VPanel: require('components/panel/panel.vue'),
    },
};
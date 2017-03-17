<template>
    <router-view></router-view>
</template>

<script>

    import store from './store';
    import {router} from './../bootstrap';
    import accountService from './services/account';

    export default {
        /**
         * The Vuex store
         */
        store,

        /**
         * The router
         */
        router,

        mounted() {
            // If the user is authenticated,
            // fetch the data from the API
            if (this.$store.state.auth.authenticated) {
                console.log(this.$store.state.auth)
                accountService.find();
            }
        },
    }
</script>
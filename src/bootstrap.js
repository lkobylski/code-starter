/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application
 */


import Vue from 'vue';

Vue.config.debug = process.env.NODE_ENV !== 'production';

const bus = new Vue();

// Bind the event bus to Vue.
Vue.$bus = bus;
Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return bus;
    },
});


/* ============
 * Axios
 * ============
 */

import Axios from 'axios';
import authService from './app/services/auth';

Axios.defaults.baseURL = '/';
Axios.defaults.headers.common.Accept = 'application/json';
Axios.interceptors.response.use(
    (response) => {
        return Promise.resolve(response.data)
    },
    (error) => {
        if (error.response.status === 401) {
            authService.logout();
        }
        let err = error;
        if(error.response.data) {
            err = error.response.data;
        }
        return Promise.reject(err)
    });
Vue.$http = Axios;


/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-Router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import VuexRouterSync from 'vuex-router-sync';
import store from './app/store';

store.dispatch('checkAuthentication');


/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';
import routes from './app/routes';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
        /*
         * If the user is not authenticated and visits
         * a page that requires authentication, redirect to the login page
         */
        next({
            name: 'login.index',
        });
    } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
        /*
         * If the user is authenticated and visits
         * an guest page, redirect to the dashboard page
         */
        next({
            name: 'home.index',
        });
    } else {
        next();
    }
});

VuexRouterSync.sync(store, router);
Vue.router = router;


/* ==============
 * Vue Components
 * ==============
 */
Vue.component('form-field', require('./app/components/form/field.vue'));
Vue.component('v-form', require('./app/components/form/form.vue'));



/* ============
 * jQuery
 * ============
 *
 * Require jQuery
 *
 * http://jquery.com/
 */
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;


/* ============
 * CSS styles (Scss)
 * ============
 */

require ('./assets/scss/style.scss');

export default {
    router,
};

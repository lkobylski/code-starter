/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */

/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
    // Home



    {
        path: '/home',
        name: 'home.index',
        component: require('./pages/home/index/index.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            auth: true,
        },
    },

    // Account
    {
        path: '/account',
        name: 'account.index',
        component: require('pages/account/index/index.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            auth: true,
        },
    },


    // Login
    {
        path: '/login',
        name: 'login.index',
        component: require('pages/login/index/index.vue'),

        // If the user needs to be a guest to view this page
        meta: {
            guest: true,
        },
    },


    // Register
    {
        path: '/register',
        name: 'register.index',
        component: require('pages/register/index/index.vue'),

        // If the user needs to be a guest to view this page
        meta: {
            guest: true,
        },
    },

    // Articles
    {
        path: '/articles',
        name: 'articles.index',
        component: require('pages/articles/index/index.vue'),
        // If the user needs to be authenticated to view this page
        meta: {
            auth: true,
        },
    },

    // Articles
    {
        path: '/articles/create',
        name: 'articles.create',
        component: require('pages/articles/create/index.vue'),
        // If the user needs to be authenticated to view this page
        meta: {
            auth: true,
        },
    },

     // Edit one article
    {
        path: '/articles/edit/:id',
        name: 'articles.edit',
        component: require('pages/articles/edit/index.vue'),
        // If the user needs to be authenticated to view this page
        meta: {
            auth: true,
        },
    },



    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/*',
        redirect: '/home',
    },
];
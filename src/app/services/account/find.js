import Vue from 'vue';
import accountTransformer from './../../transformers/account';
import store from './../../store';

// When the request succeeds
const success = (account) => {
    account = accountTransformer.fetch(account);

    store.dispatch('getAccount', account);
};

// When the request fails
const failed = () => {
};

export default () => {
    /*
     * Normally you would perform an AJAX-request.
     * But to get the example working, the data is hardcoded.
     *
     * With the include REST-client Axios, you can do something like this:
     * Vue.$http.get('/account')
     *   .then((response) => {
     *     success(response);
     *   })
     *   .catch((error) => {
     *     failed(error);
     *   });
     */

    Vue.$http.get('/api/user')
        .then((response) => {
            success(response);
        })
        .catch((error) => {
            failed(error);
        });

};

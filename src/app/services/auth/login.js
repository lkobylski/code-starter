import Vue from 'vue';
import store from './../../store';
import accountService from './../account';

// When the request succeeds
const success = (data) => {
    store.dispatch('login', data.token);
    accountService.find();
    Vue.router.push({
        name: 'home.index',
    });
};

// When the request fails
const failed = (err) => {
    console.log(err.message);
};

export default (user) => {

    return new Promise((resolve, reject) => {
        Vue.$http.post('/api/user/login', user)
            .then((response) => {
                resolve(response);
                success(response);

            })
            .catch((error) => {
                reject(error);
            });
    });
    // if (!user.email || !user.password) {
    //     failed();
    // } else {
    //     success('RandomGeneratedToken');
    // }
};

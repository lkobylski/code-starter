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

     Vue.$http.post('/api/user/login', user)
        .then((response) => {
          success(response);
        })
        .catch((error) => {
          failed(error);
        });

    // if (!user.email || !user.password) {
    //     failed();
    // } else {
    //     success('RandomGeneratedToken');
    // }
};

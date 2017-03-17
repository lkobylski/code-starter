import Vue from 'vue';

// When the request succeeds
const success = () => {

    Vue.router.push({
        name: 'home.index',
    });
};

// When the request fails
const failed = (err) => {

    console.log(err.message);
};

export default (user) => {
    /*
     * Normally you would perform an AJAX-request.
     * But to get the example working, the data is hardcoded.
     *
     * With the include REST-client Axios, you can do something like this:
     * Vue.$http.post('/register', user)
     *   .then((response) => {
     *     success(response);
     *   })
     *   .catch((error) => {
     *     failed(error);
     *   });
     */

    Vue.$http.post('/api/user/register', user)
        .then((response) => {
        console.log('Success ? :/', response);
            success(response);
        })
        .catch((error) => {
            failed(error);
        });

    // if (!user.email || !user.password || !user.passwordConfirm || !user.firstName || !user.lastName) {
    //     failed('Form err');
    // } else if (user.password !== user.passwordConfirm) {
    //     failed();
    // } else {
    //     success('RandomGeneratedToken');
    // }
};

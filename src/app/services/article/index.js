import Vue from 'vue';


const success = () => {
    Vue.router.push({
        name: 'articles.index',
    });
};

// When the request fails
const failed = (err) => {

    console.log(err.message);
};

export default {
    get: function (id) {
        return new Promise((resolve, reject) => {
            Vue.$http.get('/api/article/' + id)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    list: function () {
        return new Promise((resolve, reject) => {
            Vue.$http.get('/api/article')
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        })

    },

    create: function (article) {
        return new Promise((resolve, reject) => {
            Vue.$http.post('/api/article', article)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    update: function (id, article) {
        return new Promise((resolve, reject) => {
            Vue.$http.post('/api/article/' + id, article)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: function (id) {
        return new Promise((resolve, reject) => {
            Vue.$http.delete('/api/article/' + id)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

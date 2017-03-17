## Code - Starter  
Boilerplate for create new projects base on:  
- NodeJS
- Vuejs (https://vuejs.org)
- Hapi (hapijs.com)
- Webpack (https://webpack.js.org/)
- Scss 
- Bulma (http://bulma.io/)

### Run

MongoDB is required.

If you don't have install mongodb you can use this free version https://mlab.com/

After that please update your mongodb credentials in config file (server/config/env/local.js):
add settings:
```json
module.exports = {
    ...
    database: {
        "host": "dsXXXX.mlab.com",
        "port": 33450,
        "db": "code-starter",
        "username": "dbuser",
        "password": "testXXX"
    },
};
```

```
npm install
```

```
npm run build
```  

On another terminal window:
```
npm run start
```
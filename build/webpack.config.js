var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require("webpack");
var vueLoaderConfig = {};

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: '../css/style.css',
    allChunks: true
});


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function postcss() {
    return [autoprefixer];
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: './public/js',
        filename: 'bundle.js',
        publicPath: '/js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            // '@': resolve('src'),
            'src': path.resolve(__dirname, '../src'),
            'app': path.resolve(__dirname, '../src/app'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'scss': path.resolve(__dirname, '../src/assets/scss'),
            'components': path.resolve(__dirname, '../src/app/components'),
            'layouts': path.resolve(__dirname, '../src/app/layouts'),
            // 'locale': path.resolve(__dirname, '../src/app/locale'),
            // 'mixins': path.resolve(__dirname, '../src/app/mixins'),
            'pages': path.resolve(__dirname, '../src/app/pages'),
            'services': path.resolve(__dirname, '../src/app/services'),
            'store': path.resolve(__dirname, '../src/app/store'),
             'transformers': path.resolve(__dirname, '../src/app/transformers'),
            // 'utils': path.resolve(__dirname, '../src/app/utils')
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: "pre",
            //     include: [resolve('src'), resolve('test')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                            includePaths: [path.resolve(__dirname, './node_modules/compass-mixins/lib'), path.resolve(__dirname, "./node_modules/bulma")]
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })

            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '/../fonts/[name].[hash:7].[ext]'
                   // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        extractSass
    ]
}
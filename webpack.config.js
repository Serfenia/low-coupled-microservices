const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const config = {
    entry: {
        app: ['babel-polyfill', './client/app/Root.js'],
        style: ['./style/reset.less','./style/main.less'],
        vendor: [ 'react', 'material-ui' ]
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/,         loaders: __dirname !== '/src' ? ['react-hot-loader', 'babel-loader'] : 'babel-loader'},
            { test: require.resolve("react"),                   loader: "expose-loader?React" },
            { test: /\.json$/,                                  loader: "json-loader" },
            { test: /\.less$/,                                  loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader!postcss-loader!less-loader"}) },
            { test: /\.(woff|woff2|ttf)(\?v=\d+\.\d+\.\d+)?$/,  loader: "file-loader" },
            { test: /\.po$/,                                    loader: 'raw-loader'},
            { test: /\.(svg|eot)(\?v=\d+\.\d+\.\d+)?$/,         loader: "file-loader" },
            { test: /\.(png|jpg)$/,                             loader: 'url-loader'},
            { test: /node_modules\/auth0-lock\/.*\.js$/,        loaders: ['transform-loader/cacheable?brfs', 'transform-loader/cacheable?packageify'] },
            { test: /node_modules\/auth0-lock\/.*\.ejs$/,       loader: 'transform-loader/cacheable?ejsify' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                "NODE_ENV": JSON.stringify(NODE_ENV)
            }
        }),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: 'assets/index-template.html'
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("0.2"),
            DEV: NODE_ENV === 'development'
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor',  filename: 'vendor.bundle.js' }),
    ],
    resolve: {
        modules: ["node_modules"],
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true
    }
};

if (NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    );
} else {
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}


module.exports = config;
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const HMR = helpers.hasProcessFlag('hot');


module.exports = webpackMerge(commonConfig, {
    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map',

    output: {
        path: helpers.root('dist', 'dev'),
        filename: '[name].js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    /**
 * Webpack Development Server configuration
 * Description: The webpack-dev-server is a little node.js Express server.
 * The server emits information about the compilation state to the client,
 * which reacts to those events.
 *
 * See: https://webpack.github.io/docs/webpack-dev-server.html
 */
    devServer: {
        port: PORT,
        host: HOST,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        hot: HMR,
        contentBase: helpers.root('dist', 'dev')
    }
});

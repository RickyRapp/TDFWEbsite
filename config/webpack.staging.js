const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    output: {
        /**
      * The output directory as absolute path (required).
      *
      * See: http://webpack.github.io/docs/configuration.html#output-path
      */
        path: helpers.root('dist', 'staging'),
        /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
        filename: '[name].[chunkhash].bundle.js',

        /**
         * The filename of the SourceMaps for the JavaScript files.
         * They are inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
         */
        sourceMapFilename: '[name].[chunkhash].bundle.map',
    },
    plugins: [
        new ExtractTextPlugin('[name].[chunkhash].min.css'),
        /**
         * Minimize bundled output.
         */
        new UglifyJsPlugin({
            cache: helpers.root('dist', 'cached_uglify'),
            sourceMap: true,
            uglifyOptions: {
                ecma: 5,
                output: {
                    comments: false,
                    beautify: false
                },
                compressor: {
                    warnings: false
                }
            }
        }),

        /**
      * Plugin: WebpackMd5Hash
      * Description: Plugin to replace a standard webpack chunkhash with md5.
      *
      * See: https://www.npmjs.com/package/webpack-md5-hash
      */
        new WebpackMd5Hash()
    ],
    devtool: 'source-map'
});

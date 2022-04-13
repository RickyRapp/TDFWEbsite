const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlElementsPlugin = require('html-elements-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const helpers = require('./helpers');
const htmlWebpackPluginConstructor = require('./html-webpack-plugin-constructor');
const styleLintOptions = require('../.stylelintrc.json');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const configurationPath = './../configuration';
const applicationSettings = require(`${configurationPath}/${process.env.NODE_ENV}/application-settings.json`);
console.log(applicationSettings);
const HMR = helpers.hasProcessFlag('hot');

const METADATA = {
    title: 'The Donors Fund',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer(),
    HMR: HMR,
    ApplicationSettings: JSON.stringify(applicationSettings)
};

const htmlPluginFiles = htmlWebpackPluginConstructor.createHtmlWebpackPlugin({
    configurationRootDir: helpers.root(),
    searchRootDir: helpers.root('src'),
    metadata: METADATA,
    baseScripts: ['app'],
    templateOverrides: [
        {
            fileName: 'index',
            chunks: ['app', 'main-page']
        }
    ]
});

module.exports = {
    /**
     * Path from which all relative webpack paths will be resolved.
     */
    context: helpers.root(),
    entry: {
        'app': './src/index.js',
        'create-account': './src/js/create-account/create-account.js',
        'account-activation': './src/js/account-activation/account-activation.js',
        'what-we-offer': './src/js/what-we-offer/what-we-offer.js',
        'main-page': './src/js/main-page/main-page.js',
        'about': './src/js/about/about.js',
        'contact': './src/js/contact/contact.js',
        'investments': './src/js/investments/investments.js'
    },
    /**
     * Rule for which files should be transpiled via typescript loader.
     */
    module: {
        rules: [
            /**
            * Global css files 
            */
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    filename: '[name].css',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            /** 
             *  File loader for supporting images, for example, in CSS files.
            */
            {
                test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader'
            },
            {test: /\.(config)$/, loader: `file-loader?name=[name].[ext]`}
        ]
    },
    resolve: {},
    /**
     * Specify output as an UMD library.
     */
    plugins: [
        /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
        new DefinePlugin({
            ENV: JSON.stringify(METADATA.ENV),
            HMR: METADATA.HMR,
            ApplicationSettings: METADATA.ApplicationSettings
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        /*
         * Plugin: HtmlElementsPlugin
         * Description: Generate html tags based on javascript maps.
         *
         * If a publicPath is set in the webpack output configuration, it will be automatically added to
         * href attributes, you can disable that by adding a "=href": false property.
         * You can also enable it to other attribute by settings "=attName": true.
         *
         * The configuration supplied is map between a location (key) and an element definition object (value)
         * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
         *
         * Example:
         *  Adding this plugin configuration
         *  new HtmlElementsPlugin({
         *    headTags: { ... }
         *  })
         *
         *  Means we can use it in the template like this:
         *  <%= webpackConfig.htmlElements.headTags %>
         *
         * Dependencies: HtmlWebpackPlugin
         */
        new HtmlElementsPlugin({
            headTags: require('./head-config.common')
        }),
        /*
        * Plugin: CopyWebpackPlugin
        * Description: Copy files and directories in webpack.
        *
        * Copies project static assets.
        *
        * See: https://www.npmjs.com/package/copy-webpack-plugin
        */
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
        new StyleLintPlugin({
            configFile: styleLintOptions
        })
    ].concat(htmlPluginFiles)
};
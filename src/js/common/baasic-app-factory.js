'use strict';

require('reflect-metadata'); // required by baasic-sdk-javascript
const baasicSdkJavascript = require('baasic-sdk-javascript');

class BaasicAppFactory {
    create() {
        return new baasicSdkJavascript.BaasicApp(ApplicationSettings.applicationName, {
            apiRootUrl: ApplicationSettings.apiRootUrl,
            apiVersion: ApplicationSettings.apiVersion,
            useSSL: ApplicationSettings.useSSL
        });
    }
}

const baasicAppFactory = new BaasicAppFactory();
module.exports = baasicAppFactory;
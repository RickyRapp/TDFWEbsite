'use strict';

const baasicAppFactory = require('./baasic-app-factory.js');

const tdfTokenName = 'tdf-auth-token';

class TokenService {

    storeTokenName() {
        localStorage.setItem(tdfTokenName, `baasic-auth-token-${ApplicationSettings.applicationName}`);
    }

    getToken() {
        const baasicApp = baasicAppFactory.create();
        return baasicApp.tokenHandler.get();
    }

    removeToken() {
        localStorage.removeItem(tdfTokenName);
    }

    isAuthenticated() {
        const token = this.getToken();
        if (token) {
            return token.expireTime > new Date().getTime();
        }

        return false;
    }
}

const tokenService = new TokenService();
module.exports = tokenService;
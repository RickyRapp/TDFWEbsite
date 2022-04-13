'use strict';

const baasicAppFactory = require('./baasic-app-factory.js');
const tokenService = require('./token-service.js');
const API = require('./constants/API.js');
const LOCATION = require('./constants/LOCATION.js');

/**
 * LoginData {
 *      username: string;
 *      password: string;
 * }
 */

class LoginService {
    login(loginData) {
        const baasicApp = baasicAppFactory.create();
        baasicApp.membershipModule.login.routeDefinition.loginRoute = API.LOGIN;

        const data = {
            username: loginData.username,
            password: loginData.password,
            options: ['sliding']
        };

        // convert jQuery Deferred object to Promise
        return new Promise((resolve, reject) => {
            baasicApp.membershipModule.login.login(data)
                .then(function (response) {
                    tokenService.storeTokenName(baasicApp.apiKey)
                    resolve(response);
                }, function (response) {
                    reject(response);
                });
        });
    }

    logout() {
        const token = tokenService.getToken();
        if (token) {
            const baasicApp = baasicAppFactory.create();
            baasicApp.membershipModule.login.routeDefinition.loginRoute = API.LOGIN;

            // convert jQuery Deferred object to Promise
            return new Promise((resolve, reject) => {
                baasicApp.membershipModule.login.logout(token.token, token.type)
                    .then(function (response) {
                        tokenService.removeToken();
                        resolve(response);
                    }, function (response) {
                        reject(response);
                    });
            });
        }
    }

    forgotPassword(email) {
        const baasicApp = baasicAppFactory.create();
        baasicApp.membershipModule.login.routeDefinition.loginRoute = API.LOGIN;

        const recoverUrl = `${window.location.origin}/${LOCATION.RECOVER_PASSWORD}?passwordRecoveryToken={passwordRecoveryToken}`;
        let requestPasswordReset = {
            userName: email,
            recoverUrl: recoverUrl
        };

        return new Promise((resolve, reject) => {
            baasicApp.membershipModule.passwordRecovery.requestReset(requestPasswordReset)
                .then(function (response) {
                    resolve(response);
                }, function (response) {
                    reject(response);
                });
        });
    }

    recoverPassword(password, passwordRecoveryToken) {
        const baasicApp = baasicAppFactory.create();
        baasicApp.membershipModule.login.routeDefinition.loginRoute = API.LOGIN;

        const resetPassword = {
            newPassword: password,
            passwordRecoveryToken: passwordRecoveryToken
        };
        return new Promise((resolve, reject) => {
            baasicApp.membershipModule.passwordRecovery.reset(resetPassword)
                .then(function (response) {
                    resolve(response);
                }, function (response) {
                    reject(response);
                });
        });
    }
}

const loginService = new LoginService();
module.exports = loginService;
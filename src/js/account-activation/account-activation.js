'use strict';

const routingService = require('../common/routing-service.js');
const LOCATION = require('../common/constants/LOCATION.js');
const baasicAppFactory = require('../common/baasic-app-factory.js');
const tokenService = require('../common/token-service.js');

const queryParams = routingService.getQueryParams();

function isNullOrWhiteSpacesOrUndefinedOrEmpty(value) {
    return value === null || value === undefined || value === '' || value.replace(/\s/g, '') === '';
}

if (isNullOrWhiteSpacesOrUndefinedOrEmpty(queryParams.activationToken)) {
    routingService.changeLocation(LOCATION.INDEX);
}
else {
    activateAccount(queryParams.activationToken)
        .then(function () {
            $('.jq-activation-in-process').hide();
            $('.jq-activation-finished').show();
        }, function (response) {
            $('.jq-activation-in-process').hide();
            $('#messageContainer').empty();
            let errorMessage = 'Please contact the support team.';
            if (response && response.data && typeof response.data === 'string') {
                errorMessage = response.data;
            }
            $('#messageContainer').append(`<div class="card card--white u-mar--top--med"><h4>Unable to activate account.</h4><p class='type--sml type--color--warning spc--top--tny'>${errorMessage}</p></div>`);
        });
}

function activateAccount(activationToken) {
    const baasicApp = baasicAppFactory.create();
    // convert jQuery Deferred object to Promise        
    return new Promise((resolve, reject) => {
        baasicApp.membershipModule.register.activate(activationToken)
            .then(function (response) {
                tokenService.storeTokenName();
                resolve(response);
            }, function (response) {
                reject(response);
            });
    });
}

$('#btnMakeFirstContribution').on('click', function () {
    routingService.changeAppLocation(LOCATION.MAKE_FIRST_CONTRIBUTION);
})

$('#btnLegacyOptions').on('click', function () {
    alert('TODO')
})
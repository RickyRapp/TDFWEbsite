'use strict';

const queryStringService = require('query-string');

class RoutingService {
    changeLocation(path) {
        window.location = this.createUrl(path);
    }

    changeAppLocation(path) {
        const appBaseUrl = ApplicationSettings.appBaseUrl.replace(/\//g, '');
        window.location = this.createUrl(`${appBaseUrl}/${path}`);
    }

    createUrl(path) {
        const origin = window.location.origin;
        if (path) {
            return `${origin}/${path}`;
        } else {
            return origin;
        }
    }

    getQueryParams() {
        return queryStringService.parse(window.location.search);
    }
}

const routingService = new RoutingService();
module.exports = routingService;
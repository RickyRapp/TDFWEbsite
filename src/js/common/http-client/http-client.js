'use strict';

function parseHeaders(headers) {
    let result = {};
    if (headers) {
        var arrayOfLines = headers.match(/[^\r\n]+/g);
        for (var i = 0; i < arrayOfLines.length; i++) {
            var line = arrayOfLines[i];
            var keyValue = line.split(':');
            if (keyValue.length === 2) {
                result[keyValue[0]] = keyValue[1].trim();
            } else if (keyValue.length === 1) {
                result[keyValue[0]] = null;
            }
        }
    }
    return result;
}

function createRequest(request) {
    return new Promise((resolve, reject) => {
        $.ajax(request)
            .then((data, textStatus, jqXHR) => {
                resolve({
                    statusText: textStatus,
                    statusCode: jqXHR.status,
                    headers: parseHeaders(jqXHR.getAllResponseHeaders()),
                    data: data
                });
            }, (jqXHR, textStatus, errorThrown) => {
                reject({
                    statusText: textStatus,
                    statusCode: jqXHR.status,
                    headers: parseHeaders(jqXHR.getAllResponseHeaders()),
                    data: tryParseJson(jqXHR.responseText) || jqXHR.responseXML
                });
            });
    });
}

function tryParseJson(obj) {
    try {
        return JSON.parse(obj);
    } catch (err) {
        return obj;
    }
}

class HttpClient {
    createUrl(url) {
        return `${ApplicationSettings.useSSL ? 'https' : 'http'}://${ApplicationSettings.apiRootUrl}/${ApplicationSettings.applicationName}/${url}`;
    }

    post(url, data, headers) {
        let request = {
            method: 'POST',
            url: this.createUrl(url),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        };

        if (data) {
            request.data = JSON.stringify(data);
        }

        headers = headers || {};
        headers['Content-Type'] = 'application/json; charset=UTF-8';
        request.headers = headers;

        return createRequest(request);
    }

    put(url, data, headers) {
        let request = {
            method: 'PUT',
            url: this.createUrl(url),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        };

        if (data) {
            request.data = JSON.stringify(data);
        }

        headers = headers || {};
        headers['Content-Type'] = 'application/json; charset=UTF-8';
        request.headers = headers;

        return createRequest(request);
    }

    get(url, headers) {
        let request = {
            method: 'GET',
            url: this.createUrl(url),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        };

        if (headers) {
            request.headers = headers;
        }

        return $.when($.get(request));
    }

    delete(url, headers) {
        let request = {
            method: 'DELETE',
            url: this.createUrl(url),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        };

        if (headers) {
            request.headers = headers;
        }

        return $.when($.get(request));
    }
}

const httpClient = new HttpClient();
module.exports = httpClient;
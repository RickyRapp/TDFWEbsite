'use strict';

const httpClient = require("../common/http-client/http-client.js");
const API = require('../common/constants/API.js');

const validation = {
    errorElement: 'p',
    errorPlacement: function (error, element) {
        var divError =
            $("<div>").addClass('validation__message').append($('<div>').addClass('validation__message__item').append(error))

        divError.insertBefore(element);
    },
    onkeyup: false,
    rules: {
        fullName: {
            required: true,
            whitespace: true
        },
        company: {
            required: false,
        },
        email: {
            required: true,
            email: true
        },
        number: {
            required: false,
            email: false
        },
        message: {
            required: true
        }
    }
};

module.exports = validation;
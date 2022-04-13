'use strict';


require('jquery-validation'); // required by jquery for form validation
const httpClient = require("../common/http-client/http-client.js");
const API = require('../common/constants/API.js');

const formService = require('../common/form-service.js');
const formValidation = require('./contact-form-validation.js');
const jqWhitespaceValidator = require('../common/utils/jq-whitespace-validator.js');

$.validator.addMethod('whitespace', jqWhitespaceValidator);
$('#contactUsForm').validate(formValidation);

$('#fullName').focus();

$('form').submit(function (event) {
    if ($('#contactUsForm').valid()) {
        event.preventDefault();
        //set disable button and toggle button spinner
        const submitButton = $('#sendMessage');
        submitButton.prop('disabled', true);

        const formData = formService.getFormData($(this));

        const model = {
            fullName: formData.fullName.trim(),
            company: formData.company.trim() === '' ? null : formData.company.trim(),
            email: formData.email.trim(),
            number: formData.number.trim() === '' ? null : formData.number.trim(),
            message: formData.message.trim(),
        };

        httpClient.post(API.CONTACT_US, model, null)
            .then(function (data) {
                if (data.statusCode === 201) {
                    $('#successContainer').empty();
                    let successMessage = "<h4>Thank you, your message was successfully sent! </h4>We'll get back to you as soon as possible.";
                    $('#successContainer').append(`<div class='card--white type--center u-mar--top--med'>${successMessage}</div>`);
                    //success
                }
                else {
                    //handle error
                }
            }, function (response) {
                $('#errorContainer').empty();
                let errorMessage = 'Something went wrong. Please contact the support team.';
                if (response) {
                    if (typeof response === 'string') {
                        errorMessage = response;
                    } else if (response.message) {
                        errorMessage = response.message;
                    }
                }
                $('#errorContainer').append(`<div class='card--white type--center type--color--warning u-mar--top--med'>${errorMessage}</div>`);
            })
            .finally(function () {
                // remove disable button and toggle button spinner
                submitButton.prop('disabled', false);
            });
    }
});

$("#number").on('keypress', function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
    var curchr = this.value.length;
    var curval = $(this).val();
    if (curchr == 3 && curval.indexOf("(") <= -1) {
        $(this).val("(" + curval + ")" + " ");
    } else if (curchr == 4 && curval.indexOf("(") > -1) {
        $(this).val(curval + ")-");
    } else if (curchr == 5 && curval.indexOf(")") > -1) {
        $(this).val(curval + "-");
    } else if (curchr == 9) {
        $(this).val(curval + "-");
        $(this).attr('maxlength', '14');
    }
});
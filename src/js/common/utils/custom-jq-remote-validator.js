'use strict';

/**
 * Override JQuery remote validator method to support success/error remote validation
 */

function customJQueryRemoteValidator(value, element, param, method) {
    if (this.optional(element)) {
        return 'dependency-mismatch';
    }

    method = typeof method === 'string' && method || 'remote';

    var previous = this.previousValue(element, method),
        validator, data, optionDataString;

    if (!this.settings.messages[element.name]) {
        this.settings.messages[element.name] = {};
    }
    previous.originalMessage = previous.originalMessage || this.settings.messages[element.name][method];
    this.settings.messages[element.name][method] = previous.message;

    param = typeof param === 'string' && { url: param } || param;
    optionDataString = $.param($.extend({ data: value }, param.data));
    if (previous.old === optionDataString) {
        return previous.valid;
    }

    previous.old = optionDataString;
    validator = this;
    this.startRequest(element);
    $.ajax($.extend(true, {
        mode: 'abort',
        port: 'validate' + element.name,
        dataType: 'json',
        data: data,
        context: validator.currentForm,
        success: function (response) {
            var valid = false, errors, message, submitted;

            validator.settings.messages[element.name][method] = previous.originalMessage;

            errors = {};
            message = validator.defaultMessage(element, { method: method, parameters: value });
            errors[element.name] = previous.message = message;
            validator.invalid[element.name] = true;
            validator.showErrors(errors);

            previous.valid = valid;
            validator.stopRequest(element, valid);
        },
        error: function (response) {
            var valid = true, errors, message, submitted;

            submitted = validator.formSubmitted;
            validator.resetInternals();
            validator.toHide = validator.errorsFor(element);
            validator.formSubmitted = submitted;
            validator.successList.push(element);
            validator.invalid[element.name] = false;
            validator.showErrors();

            previous.valid = valid;
            validator.stopRequest(element, valid);
        }
    }, param));
    return 'pending';
}

module.exports = customJQueryRemoteValidator;
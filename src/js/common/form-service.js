'use strict';

class FormService {

    getFormData(form) {
        const values = form.serializeArray();
        if (values) {
            var obj = {};
            for (var item of values) {
                const key = item.name;
                obj[key] = item.value;
            }

            $(`#${form[0].name} input:checkbox`).each(function () {
                if (this.name) {
                    if (!(this.name in obj)) {
                        obj[this.name] = this.checked;
                    }
                }
            });

            return obj;
        }
    }
}

const formService = new FormService();
module.exports = formService;
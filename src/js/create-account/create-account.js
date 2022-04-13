'use strict';

require('jquery-validation'); // required by jquery for form validation
const httpClient = require('../common/http-client/http-client.js');
const routingService = require('../common/routing-service.js');
const LOCATION = require('../common/constants/LOCATION.js');
const API = require('../common/constants/API.js');

const formService = require('../common/form-service.js');
const formValidation = require('./create-account-form-validation.js');
const customJQueryRemoteValidator = require('../common/utils/custom-jq-remote-validator.js');
const jqWhitespaceValidator = require('../common/utils/jq-whitespace-validator.js');
const jqUsernameValidator = require('../common/utils/jq-username-validator.js');

// validate form on keyup and submit
$.validator.methods.remote = customJQueryRemoteValidator;
$.validator.addMethod('whitespace', jqWhitespaceValidator);
$.validator.addMethod('username', jqUsernameValidator);
$.validator.addMethod(
	"pattern",
	function (value, element, regexp) {
		var re = new RegExp(regexp);
		return this.optional(element) || re.test(value);
	}
);
$('#createAccountForm').validate(formValidation);

$('#firstName').focus();

const filter = {
	pageIndex: 1,
	searchQuery: null,
};

let taxId = null;

$('#onNextStep1Button').on('click', function () {
	if ($('#createAccountForm').valid()) {
		$('#step_1').hide();
		$('#step_2').show();

		if ($('#isCharityAccount').is(':checked')) {
			loadMore();
		} else {
			$('#fundName').focus();
		}
	}
});

$('form').submit(function (event) {
	if ($('#createAccountForm').valid()) {
		event.preventDefault();
		//set disable button and toggle button spinner
		const submitButton = $('#onNextStep2Button');
		submitButton.prop('disabled', true);

		const formData = formService.getFormData($(this));
		let activationUrl = routingService.createUrl(LOCATION.ACCOUNT_ACTIVATION);
		activationUrl = `${activationUrl}?activationToken={activationToken}`;

		const registerModel = {
			activationUrl: activationUrl,
			firstName: formData.firstName.trim(),
			lastName: formData.lastName.trim(),
			coreUser: {
				userName: formData.email.trim(),
				coreMembership: {
					password: formData.password,
					confirmPassword: formData.confirmPassword,
				},
			},
			emailAddress: {
				email: formData.email.trim(),
			},
			fundName: formData.fundName.trim(),
			isPrivateAccount: formData.isPrivateAccount === 'true',
			address: {
				addressLine1: formData.addressLine1.trim(),
				addressLine2: formData.addressLine2.trim() === '' ? null : formData.addressLine2.trim(),
				city: formData.city.trim(),
				state: formData.state.trim(),
				zipCode: formData.zipCode.trim(),
			},
			phoneNumber: {
				number: formData.number.trim(),
			},
			month: formData.month,
			day: formData.day,
			year: formData.year,
			isThisBusinessAccount: formData.isThisBusinessAccount === 'true',
			companyProfile: {
				name: formData.companyName.trim() === '' ? null : formData.companyName.trim(),
				dba: formData.dba.trim() === '' ? null : formData.dba.trim(),
				website: formData.website.trim() === '' ? null : formData.website.trim(),
				businessTypeId: formData.businessTypeId === '' ? null : formData.businessTypeId,
			},
			securityPin: formData.securityPin,
			confirmSecurityPin: formData.confirmSecurityPin,
		};

		if (!registerModel.isThisBusinessAccount) {
			registerModel.companyProfile = null;
		}

		httpClient.post(API.REGISTER, registerModel, null)
			.then(
				(data) => {
					if (data.statusCode === 201) {
						$('#step_2').hide();
						$('#step_3').show();
					}
				},
				(error) => {
					$('#errorContainer').empty();
					let errorMessage = 'Something went wrong. Please contact the support team.';
					if (error) {
						if (typeof error === 'string') {
							errorMessage = error;
						} else if (error.message) {
							errorMessage = error.message;
						}
					}
					$('#errorContainer').append(`<p class='validation__message validation__message--secondary'>${errorMessage}</p>`);
				}
			).finally(function () {
				// remove disable button and toggle button spinner
				submitButton.prop('disabled', false);
			});
	}
});

$('#isThisBusinessAccount').on('change', function () {
	$('[name^=businessField]').toggle();
});

$('#isCharityAccount').on('change', function (e) {
	if (e.target.checked) {
		$('[name="donorInformations"').hide();
		$('[name="charityInformations"').show();
	} else {
		$('[name="donorInformations"').show();
		$('[name="charityInformations"').hide();
	}
});

$('#number').on('keypress', function (e) {
	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
		return false;
	}
	var curchr = this.value.length;
	var curval = $(this).val();
	if (curchr == 3 && curval.indexOf('(') <= -1) {
		$(this).val('(' + curval + ')' + ' ');
	} else if (curchr == 4 && curval.indexOf('(') > -1) {
		$(this).val(curval + ')-');
	} else if (curchr == 5 && curval.indexOf(')') > -1) {
		$(this).val(curval + '-');
	} else if (curchr == 9) {
		$(this).val(curval + '-');
		$(this).attr('maxlength', '14');
	}
});

$('#btnFinish').on('click', function () {
	const submitButton = $(this);
	submitButton.prop('disabled', true);

	let activationUrl = routingService.createUrl(LOCATION.ACCOUNT_ACTIVATION);
	activationUrl = `${activationUrl}?activationToken={activationToken}`;

	const formData = formService.getFormData($('form'));
	const registerModel = {
		activationUrl: activationUrl,
		coreUser: {
			userName: formData.email,
			coreMembership: {
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			},
		},
	};

	httpClient.post(API.CHARITY_REGISTER.replace('{taxId}', taxId), registerModel, null)
		.then((data) => {
			if (data.statusCode === 201) {
				$('#step_2').hide();
				$('#step_3').show();
			}
		},
			(error) => {
				$('#errorContainer').empty();
				let errorMessage = 'Something went wrong. Please contact the support team.';
				if (data) {
					if (typeof error === 'string') {
						errorMessage = error;
					} else if (error.message) {
						errorMessage = error.message;
					}
				}
				$('#errorContainer').append(`<p class='validation__message validation__message--secondary'>${errorMessage}</p>`);
			}
		).finally(function () {
			// remove disable button and toggle button spinner
			submitButton.prop('disabled', false);
		});
});

$('#btnLoadMore').on('click', function () {
	filter.pageIndex = filter.pageIndex + 1;
	loadMore();
});

$('#searchCharities').on('blur', function (e) {
	filter.searchQuery = e.target.value;
	clearTable();
	loadMore();
});

function clearTable() {
	$('#charityGrid tbody').empty();
}

$(document).on('change', '.maintCostField', function () {
	const arr = document.getElementsByName('chkCharity');
	for (let index = 0; index < arr.length; index++) {
		const element = arr[index];
		element.checked = false;
	}
	taxId = $(this).attr('data-id');
	if ($('#chk_' + taxId).is(':checked')) {
	} else {
		$('#chk_' + taxId).prop('checked', true);
	}
});

function loadMore() {
	let url = `${API.CHARITY_SEARCH}?pageIndex=${filter.pageIndex}`;
	if (filter.searchQuery && filter.searchQuery !== '') {
		url = url + `&searchQuery=${filter.searchQuery}`;
	}
	httpClient.get(url).then(function (response) {
		if (response && response.item && response.item.length > 0) {
			response.item.map((c) => {
				var markup = `<tr>
					<td><input id="chk_${c.taxId}" class="maintCostField" name="chkCharity" type="checkbox" data-id="${c.taxId}" /></td>
					<td>${c.logo || ''}</td>
					<td>${c.name}</td>
					<td>${c.category}</td>
					<td>${c.location || ''}</td>
					<td>${c.grossReceipts || ''}</td>
					<td>${c.assets || ''}</td>
					</tr>`;
				$('#charityGridTbody').append(markup);
			});
		}
	});
}

$(function () {
	httpClient.get(API.BUSINESS_TYPE).then(function (response) {
		var $dropdown = $('#businessTypeId');
		$dropdown.append($('<option >', { value: '', selected: true }));
		$.each(response, function () {
			$dropdown.append($('<option />').val(this.id).text(this.name));
		});
	});
});

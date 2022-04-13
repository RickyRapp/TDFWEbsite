'use strict';

const httpClient = require('../common/http-client/http-client.js');
const API = require('../common/constants/API.js');

const validation = {
	errorElement: 'p',
	errorPlacement: function (error, element) {
		var divError = $('<div>').addClass('validation__message').append($('<div>').addClass('validation__message__item').append(error));

		divError.insertBefore(element);
	},
	onkeyup: false,
	rules: {
		firstName: {
			required: (element) => {
				return $('#isCharityAccount').is(':checked');
			},
			whitespace: true,
		},
		lastName: {
			required: (element) => {
				return $('#isCharityAccount').is(':checked');
			},
			whitespace: true,
		},
		email: {
			required: true,
			email: true,
			whitespace: true,
			remote: function () {
				const email = ($('#email').val() || '').trim();

				return {
					url: httpClient.createUrl(API.UNIQUE_EMAIL.replace('{email}', email)),
					type: 'GET',
					dataType: 'text',
				};
			},
		},
		password: {
			required: true,
			minlength: 8,
			pattern: /([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/
		},
		confirmPassword: {
			required: true,
			minlength: 8,
			equalTo: '#password',
		},
		fundName: {
			required: true,
			whitespace: true,
			remote: function () {
			const fundName = ($('#fundName').val() || '').trim();
			
			return {
			 		url: httpClient.createUrl(API.UNIQUE_FUND_NAME.replace('{fund-name}', btoa(fundName))),
			 		type: 'GET',
			 		dataType: 'text',
			 	};
			},
		},
		isPrivateAccount: {
			required: false,
		},
		addressLine1: {
			required: true,
		},
		addressLine2: {
			required: false,
		},
		city: {
			required: true,
		},
		state: {
			required: true,
		},
		zipCode: {
			required: true,
		},
		number: {
			required: true,
		},
		month: {
			required: true,
		},
		day: {
			required: true,
			min: 1,
			max: 31,
		},
		year: {
			required: true,
			min: 1900,
			max: new Date().getFullYear(),
		},
		securityPin: {
			required: true,
			minlength: 4,
			maxlength: 4,
		},
		confirmSecurityPin: {
			required: true,
			minlength: 4,
			maxlength: 4,
			equalTo: '#securityPin',
		},
		isCharityAccount: {},
		isThisABusinessAccount: {
			required: true,
		},
		companyName: {
			required: (element) => {
				return $('#isThisABusinessAccount').is(':checked');
			},
		},
		dba: {
			required: false,
		},
		website: {
			required: false,
			url: true,
		},
		businessTypeId: {
			required: (element) => {
				return $('#isThisABusinessAccount').is(':checked');
			},
		},
	},
	messages: {
		firstName: {
			required: 'Please enter your first name',
			whitespace: 'Please enter your first name',
		},
		lastName: {
			required: 'Please enter your last name',
			whitespace: 'Please enter your last name',
		},
		name: {
			required: 'Please enter charity name',
			whitespace: 'Please enter charity name',
		},
		email: {
			required: 'Please enter your email',
			whitespace: 'Please enter your email',
			remote: 'Email is already taken',
		},
		password: {
			required: 'Please enter your password',
			minlength: 'Your password must be at least 8 characters long',
			pattern: 'Please check your password'
		},
		confirmPassword: {
			required: 'Please enter your password',
			minlength: 'Your password must be at least 8 characters long',
			equalTo: 'Please enter the same password',
		},
		fundName: {
			required: 'Please enter fund name',
			whitespace: 'Please enter fund name',
			remote: 'Fund name is already taken',
		},
		addressLine1: {
			required: 'Please enter address line 1',
		},
		addressLine2: {},
		city: {
			required: 'Please enter city',
		},
		state: {
			required: 'Please enter state',
		},
		zipCode: {
			required: 'Please enter zip code',
		},
		month: {
			required: 'Please select month',
		},
		day: {
			required: 'Please enter day',
			min: 'Please enter correct day',
			max: 'Please enter correct day',
		},
		year: {
			required: 'Please enter year',
			min: 'Please enter correct year',
			max: 'Please enter correct year',
		},
		companyName: {
			required: 'Please enter company name',
		},
		businessTypeId: {
			required: 'Please select business type',
		},
		pin: {
			required: 'Please enter your pin',
			minlength: 'Your pin must be 4 digits long',
			maxlength: 'Your pin must be 4 digits long',
		},
		confirmPin: {
			required: 'Please enter your password',
			minlength: 'Your pin must be 4 digits long',
			maxlength: 'Your pin must be 4 digits long',
			equalTo: 'Please enter the same pin',
		},
	},
};

module.exports = validation;

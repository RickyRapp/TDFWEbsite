const API = {
	REGISTER: 'donor/register',
	CHARITY_REGISTER: 'charity/create-online-account/{taxId}',
	UNIQUE_EMAIL: 'users/{email}/exists',
	UNIQUE_FUND_NAME: 'donor/fund-name/{fund-name}/exists',
	LOGIN: 'login/{?embed,fields,options}',
	CONTACT_US: 'public/contact-us',
	BUSINESS_TYPE: 'business-type',
	CHARITY_SEARCH: 'public/charity-search',
};

module.exports = API;

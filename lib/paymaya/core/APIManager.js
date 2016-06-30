var paymayaSdk = require("./../PaymayaSDK");
var Constants = require("./../core/Constants");
var HttpConfig = require("./HttpConfig");
var HttpConnection = require("./HttpConnection");

function APIManager() {
	this._CHECKOUT_ENDPOINT = "/v1/checkouts";
	this._PAYMENTS_ENDPOINT = "/v1/payments";
	this._CUSTOMIZATION_ENDPOINT = "/v1/customizations";
	this._WEBHOOKS_ENDPOINT = "/v1/webhooks";

	this._METHOD = {
		HTTP_GET: "GET",
		HTTP_POST: "POST",
		HTTP_PUT: "PUT",
		HTTP_DELETE: "DELETE"
	};
};

APIManager.prototype = {

	/* PUBLIC FUNCTIONS */
	// CHECKOUT
	executeInitiateCheckout: function(checkoutInformationData, callback) {
		var checkoutAPIKey = paymayaSdk.getCheckoutAPIKey();
		this._execute(checkoutInformationData, this._getApiBaseUrl() + this._CHECKOUT_ENDPOINT, this._METHOD.HTTP_POST, checkoutAPIKey, callback);
	},

	executeRetrieveCheckout: function(checkoutId, callback) {
		var checkoutSecretKey = paymayaSdk.getCheckoutSecretKey();
		this._execute({}, this._getApiBaseUrl() + this._CHECKOUT_ENDPOINT + "/" + checkoutId, this._METHOD.HTTP_GET, checkoutSecretKey, callback);
	},

	// PAYMENT

	// CUSTOMIZATION
	executeSetCustomization: function(customizationData, callback) {
		var checkoutSecretKey = paymayaSdk.getCheckoutSecretKey();
		this._execute(customizationData, this._getApiBaseUrl() + this._CUSTOMIZATION_ENDPOINT, this._METHOD.HTTP_POST, checkoutSecretKey, callback);
	},

	executeGetCustomization: function(callback) {
		var checkoutSecretKey = paymayaSdk.getCheckoutSecretKey();
		this._execute({}, this._getApiBaseUrl() + this._CUSTOMIZATION_ENDPOINT, this._METHOD.HTTP_GET, checkoutSecretKey, callback);
	},

	executeRemoveCustomization: function(callback) {
		var checkoutSecretKey = paymayaSdk.getCheckoutSecretKey();
		this._execute({}, this._getApiBaseUrl() + this._CUSTOMIZATION_ENDPOINT, this._METHOD.HTTP_DELETE, checkoutSecretKey, callback);
	},

	// WEBHOOK
	executeRegisterWebhook: function(webhookData, callback) {
		var checkoutSecretKey = paymayaSdk.getCheckoutSecretKey();
		this._execute(webhookData, this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT, this._METHOD.HTTP_POST, checkoutSecretKey, callback);
	},

	executeRetrieveWebhooks: function(callback) {
		var checkoutSecretKey = paymayaSdk.getCheckoutSecretKey();
		this._execute({}, this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT, this._METHOD.HTTP_GET, checkoutSecretKey, callback);
	},

	executeUpdateWebhook: function(webhookId, webhookData, callback) {
		var checkoutSecretKey = paymayaSdk.getCheckoutSecretKey();
		this._execute(webhookData, this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT + "/" + webhookId, this._METHOD.HTTP_PUT, checkoutSecretKey, callback);
	},

	executeRemoveWebhook: function(webhookId, callback) {
		var checkoutSecretKey = paymayaSdk.getCheckoutSecretKey();
		this._execute({}, this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT + "/" + webhookId, this._METHOD.HTTP_DELETE, checkoutSecretKey, callback);
	},

	/* PRIVATE FUNCTIONS */
	_execute: function(data, url, method, apiKey, callback) {
		var secretKey = "";
		var maximumRequestAttempt = 5;
		var authenticationToken = this._createAuthorizationToken(apiKey);

		var httpConfigOptions = {
			url: url,
			method: method,
			headers: {
			    'Content-Type': 'application/json',
			    'Authorization': authenticationToken
			},
			maximumRequestAttempt: maximumRequestAttempt
		};
		var httpConfig = new HttpConfig(httpConfigOptions);
		var httpConnection = new HttpConnection(httpConfig);
		httpConnection.execute(data, callback);
	},

	_getApiBaseUrl: function() {
		var checkoutEnvironment = paymayaSdk.getCheckoutEnvironment();
		var apiBaseUrl = "";
		if(checkoutEnvironment == paymayaSdk.ENVIRONMENT.PRODUCTION) {
			apiBaseUrl = Constants.CHECKOUT_PRODUCTION_URL;
		} else if(checkoutEnvironment == paymayaSdk.ENVIRONMENT.SANDBOX) {
			apiBaseUrl = Constants.CHECKOUT_SANDBOX_URL;
		} else {
			apiBaseUrl = Constants.CHECKOUT_SANDBOX_URL;
		}
		return apiBaseUrl;
	},

	_createAuthorizationToken: function (key1, key2) {
		if(typeof (key2) == 'undefined') {
		  key2 = '';
		}
		return "Basic " + new Buffer(key1 + ":" + key2).toString('base64');
	}
};

module.exports = new APIManager();
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
		this._executeCheckout(checkoutInformationData, this._getApiBaseUrl() + this._CHECKOUT_ENDPOINT, this._METHOD.HTTP_POST, callback);
	},

	executeRetrieveCheckout: function(checkoutId, callback) {
		this._executeCheckout({}, this._getApiBaseUrl() + this._CHECKOUT_ENDPOINT + "/" + checkoutId, this._METHOD.HTTP_GET, callback);
	},

	// PAYMENT

	// CUSTOMIZATION
	executeSetCustomization: function(customizationData, callback) {
		this._executeCheckout(customizationData, this._getApiBaseUrl() + this._CUSTOMIZATION_ENDPOINT, this._METHOD.HTTP_POST, callback);
	},

	executeGetCustomization: function(callback) {
		this._executeCheckout({}, this._getApiBaseUrl() + this._CUSTOMIZATION_ENDPOINT, this._METHOD.HTTP_GET, callback);
	},

	executeRemoveCustomization: function(callback) {
		this._executeCheckout({}, this._getApiBaseUrl() + this._CUSTOMIZATION_ENDPOINT, this._METHOD.HTTP_DELETE, callback);
	},

	// WEBHOOK
	executeRegisterWebhook: function(webhookData, callback) {
		this._executeCheckout(webhookData, this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT, this._METHOD.HTTP_POST, callback);
	},

	executeRetrieveWebhooks: function(callback) {
		this._executeCheckout({}, this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT, this._METHOD.HTTP_GET, callback);
	},

	executeUpdateWebhook: function(webhookId, webhookData, callback) {
		this._executeCheckout(webhookData, this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT + "/" + webhookId, this._METHOD.HTTP_PUT, callback);
	},

	executeRemoveWebhook: function(webhookId, callback) {
		this._executeCheckout({}, this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT + "/" + webhookId, this._METHOD.HTTP_DELETE, callback);
	},

	/* PRIVATE FUNCTIONS */
	_executeCheckout: function(checkoutInformationData, url, method, callback) {
		var checkoutApiKey = paymayaSdk.getCheckoutAPIKey();
		this._execute(checkoutInformationData, url, method, checkoutApiKey, callback);
	},

	_executePayment: function(paymentInformationData, url, method, callback) {
		var paymentApiKey = paymayaSdk.getPaymentsAPIKey();
		this._execute(paymentInformationData, url, method, paymentApiKey, callback);
	},

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
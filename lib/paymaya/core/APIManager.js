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

	this._checkoutPublicApiKey = paymayaSdk.getCheckoutPublicApiKey();
	this._checkoutSecretApiKey = paymayaSdk.getCheckoutSecretApiKey();
	this._checkoutEnvironment = paymayaSdk.getCheckoutEnvironment();

	this._paymentsPublicApiKey = paymayaSdk.getPaymentsPublicApiKey();
	this._paymentsSecretApiKey = paymayaSdk.getPaymentsSecretApiKey();
	this._paymentsEnvironment = paymayaSdk.getPaymentsEnvironment();
}

APIManager.prototype = {

	/* PUBLIC FUNCTIONS */
	// CHECKOUT
	executeInitiateCheckout: function(checkoutInformationData, callback) {
		this._execute(checkoutInformationData, this._getCheckoutUrl(), this._METHOD.HTTP_POST, this._checkoutPublicApiKey, callback);
	},

	executeRetrieveCheckout: function(checkoutId, callback) {
		this._execute({}, this._getCheckoutUrlWithId(checkoutId), this._METHOD.HTTP_GET, this._checkoutSecretApiKey, callback);
	},

	getCheckoutStatus: function(id, callback) {
		// https://pg-sandbox.paymaya.com/payment/v1/payments/a1549825-1473-47dc-a4c7-f6fc17cd6f75/status
		this._execute({}, this._getPaymentsBaseUrl() + "/v1/payments/" + id + "/status", this._METHOD.HTTP_GET, this._checkoutPublicApiKey, callback);
	},

	// PAYMENT

	// CUSTOMIZATION
	executeSetCustomization: function(customizationData, callback) {
		this._execute(customizationData, this._getCustomizationUrl(), this._METHOD.HTTP_POST, this._checkoutSecretApiKey, callback);
	},

	executeGetCustomization: function(callback) {
		this._execute({}, this._getCustomizationUrl(), this._METHOD.HTTP_GET, this._checkoutSecretApiKey, callback);
	},

	executeRemoveCustomization: function(callback) {
		this._execute({}, this._getCustomizationUrl(), this._METHOD.HTTP_DELETE, this._checkoutSecretApiKey, callback);
	},

	// WEBHOOK
	executeRegisterWebhook: function(webhookData, callback) {
		this._execute(webhookData, this._getWebhookUrl(), this._METHOD.HTTP_POST, this._checkoutSecretApiKey, callback);
	},

	executeRetrieveWebhooks: function(callback) {
		this._execute({}, this._getWebhookUrl(), this._METHOD.HTTP_GET, this._checkoutSecretApiKey, callback);
	},

	executeUpdateWebhook: function(webhookId, webhookData, callback) {
		this._execute(webhookData, this._getWebhookUrlWithId(webhookId), this._METHOD.HTTP_PUT, this._checkoutSecretApiKey, callback);
	},

	executeRemoveWebhook: function(webhookId, callback) {
		this._execute({}, this._getWebhookUrlWithId(webhookId), this._METHOD.HTTP_DELETE, this._checkoutSecretApiKey, callback);
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
			    'x-paymaya-sdk': `${Constants.SDK_NAME}/${Constants.SDK_VERSION}`,
			    'Content-Type': 'application/json',
			    'Authorization': authenticationToken
			},
			maximumRequestAttempt: maximumRequestAttempt
		};
		var httpConfig = new HttpConfig(httpConfigOptions);
		var httpConnection = new HttpConnection(httpConfig);
		httpConnection.execute(data, callback);
	},

	_getCheckoutUrl: function() {
		return this._getApiBaseUrl() + this._CHECKOUT_ENDPOINT;
	},

	_getCheckoutUrlWithId: function(id) {
		return this._getApiBaseUrl() + this._CHECKOUT_ENDPOINT + "/" + id;
	},

	_getCustomizationUrl: function() {
		return this._getApiBaseUrl() + this._CUSTOMIZATION_ENDPOINT;
	},

	_getWebhookUrl: function() {
		return this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT;
	},

	_getWebhookUrlWithId: function(id) {
		return this._getApiBaseUrl() + this._WEBHOOKS_ENDPOINT + "/" + id;
	},

	_getApiBaseUrl: function() {
		var checkoutEnvironment = this._checkoutEnvironment;
		var apiBaseUrl = "";
		if(checkoutEnvironment === paymayaSdk.ENVIRONMENT.PRODUCTION) {
			apiBaseUrl = Constants.CHECKOUT_PRODUCTION_URL;
		} else if(checkoutEnvironment === paymayaSdk.ENVIRONMENT.SANDBOX) {
			apiBaseUrl = Constants.CHECKOUT_SANDBOX_URL;
		} else {
			apiBaseUrl = Constants.CHECKOUT_SANDBOX_URL;
		}
		return apiBaseUrl;
	},

	_getPaymentsBaseUrl: function() {
		var checkoutEnvironment = this._checkoutEnvironment;
		if(checkoutEnvironment === paymayaSdk.ENVIRONMENT.PRODUCTION) {
			return Constants.PAYMENTS_PRODUCTION_URL;
		} 
		return Constants.PAYMENTS_SANDBOX_URL;
	},

	_createAuthorizationToken: function (key1, key2) {
		if(typeof (key2) === 'undefined') {
		  key2 = '';
		}
		return "Basic " + new Buffer(key1 + ":" + key2).toString('base64');
	}
};

module.exports = APIManager;

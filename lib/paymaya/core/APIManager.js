var paymayaSdk = require("./../PaymayaSDK");
var Constants = require("./../core/Constants");
var HttpConfig = require("./HttpConfig");
var HttpConnection = require("./HttpConnection");

function APIManager() {
	this._CHECKOUT_ENDPOINT = "/v1/checkouts";
	this._PAYMENTS_ENDPOINT = "/v1/payments";
	this._CUSTOMIZATION_ENDPOINT = "/v1/customizations";
	this._WEBHOOKS_ENDPOINT = "/v1/webhooks";
	this._PAYMENTS_TOKEN_ENDPOINT = "/v1/payment-tokens";
	this._CUSTOMER_ENDPOINT = "/v1/customers";
	this._SUBSCRIPTION_ENDPOINT = "/v1/subscriptions"

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

	this._cardVaultPublicApiKey = paymayaSdk.getCardVaultPublicApiKey();
	this._cardVaultSecretApiKey = paymayaSdk.getCardVaultSecretApiKey();
	this._cardVaultEnvironment = paymayaSdk.getCardVaultEnvironment();
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

	// PAYMENT
	executeInitiatePayment: function(paymentInformationData, callback) {
		this._execute(paymentInformationData, this._getPaymentUrl(), this._METHOD.HTTP_POST, this._paymentsSecretApiKey, callback);
	},
	executeRetrievePayment: function(paymentId, callback) {
		this._execute({}, this._getPaymentUrlWithId(paymentId), this._METHOD.HTTP_GET, this._paymentsSecretApiKey, callback);
	},

	//CREATE TOKEN
	executeCreateToken:function(cardData,callback){
		this._execute(cardData,	this._getCreateTokenUrl(),this._METHOD.HTTP_POST,this._paymentsPublicApiKey,callback);
	},

	//CUSTOMER
	executeCreateCustomer:function(customerData,callback){
		this._execute(customerData,this._getCustomerUrl(),this._METHOD.HTTP_POST,this._paymentsSecretApiKey,callback);
	},
	executeGetCustomer:function(customerId,callback){
		this._execute({},this._getCustomerUrlWithId(customerId),this._METHOD.HTTP_GET,this._paymentsSecretApiKey,callback);
	},
	executeUpdateCustomer:function(customerData,customerId,callback){
		this._execute(customerData,this._getCustomerUrlWithId(customerId),this._METHOD.HTTP_PUT,this._paymentsSecretApiKey,callback);
	},
	executeDeleteCustomer:function(customerId,callback){
		this._execute({},this._getCustomerUrlWithId(customerId),this._METHOD.HTTP_DELETE,this._paymentsSecretApiKey,callback);
	},

	//CUSTOMER CARD VAULT
	executeSaveCard:function(cardData,customerid,callback){
		this._execute(cardData,this._getCustomerCardUrlWithId(customerid),this._METHOD.HTTP_POST,this._cardVaultSecretApiKey,callback);
	},
	executeListCard:function(customerid,callback){
		this._execute({},this._getCustomerCardUrlWithId(customerid),this._METHOD.HTTP_GET,this._cardVaultSecretApiKey,callback);
	},
	executeRetrieveCard:function(cardid,customerid,callback){
		this._execute({},this._getCustomerCardUrlWithCustomerIdAndCardId(customerid,cardid),this._METHOD.HTTP_GET,this._cardVaultSecretApiKey,callback);
	},
	executeUpdateCard:function(cardData,cardid,customerid,callback){
		this._execute(cardData,this._getCustomerCardUrlWithCustomerIdAndCardId(customerid,cardid),this._METHOD.HTTP_PUT,this._cardVaultSecretApiKey,callback);
	},
	executeDeleteCard:function(cardid,customerid,callback){
		this._execute({},this._getCustomerCardUrlWithCustomerIdAndCardId(customerid,cardid),this._METHOD.HTTP_DELETE,this._cardVaultSecretApiKey,callback);
	},
	executePaymentCard:function(paymentData,cardid,customerid,callback){
		this._execute(paymentData,this._getCustomerCardUrlWithCustomerIdAndCardIdAndPayment(customerid,cardid),this._METHOD.HTTP_POST,this._cardVaultSecretApiKey,callback);
	},

	//SUBSCRIPTION
	executeStartSubscribe:function(subscriptiondata,customerid,cardid,callback){
		this._execute(subscriptiondata,this._getCustomerCardUrlWithCustomerIdAndCardIdAndSubscription(customerid,cardid),this._METHOD.HTTP_POST,this._cardVaultSecretApiKey,callback);
	},
	executeListSubscribe:function(customerid,cardid,callback){
		this._execute({},this._getCustomerCardUrlWithCustomerIdAndCardIdAndSubscription(customerid,cardid),this._METHOD.HTTP_GET,this._cardVaultSecretApiKey,callback);
	},
	executeListSubscribePayments:function(subscriptionid,callback){
		this._execute({},this._getSubscriptionUrlWithIdAndPayment(subscriptionid),this._METHOD.HTTP_GET,this._cardVaultSecretApiKey,callback);
	},
	executeRetrieveSubscribe:function(subscriptionid,callback){
		this._execute({},this._getSubscriptionUrlWithId(subscriptionid),this._METHOD.HTTP_GET,this._cardVaultSecretApiKey,callback);
	},
	executeCancelSubscribe:function(subscriptionid,callback){
		this._execute({},this._getSubscriptionUrlWithId(subscriptionid),this._METHOD.HTTP_DELETE,this._cardVaultSecretApiKey,callback);
	},

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
	_getPaymentUrl: function() {
		return this._getPaymentApiBaseUrl() + this._PAYMENTS_ENDPOINT;
	},
	_getPaymentUrlWithId: function(id) {
		return this._getPaymentApiBaseUrl() + this._PAYMENTS_ENDPOINT + "/" + id;
	},
	_getCreateTokenUrl: function() {
		return this._getPaymentApiBaseUrl() + this._PAYMENTS_TOKEN_ENDPOINT;
	},
	_getCustomerUrl: function() {
		return this._getPaymentApiBaseUrl() + this._CUSTOMER_ENDPOINT;
	},
	_getCustomerUrlWithId: function(id) {
		return this._getPaymentApiBaseUrl() + this._CUSTOMER_ENDPOINT + "/" + id;
	},
	_getCustomerCardUrlWithId: function(id) {
		return this._getPaymentApiBaseUrl() + this._CUSTOMER_ENDPOINT + "/" + id + "/cards";
	},
	_getCustomerCardUrlWithCustomerIdAndCardId: function(customerid,cardid) {
		return this._getPaymentApiBaseUrl() + this._CUSTOMER_ENDPOINT + "/" + customerid + "/cards/" + cardid ;
	},
	_getCustomerCardUrlWithCustomerIdAndCardIdAndPayment: function(customerid,cardid) {
		return this._getPaymentApiBaseUrl() + this._CUSTOMER_ENDPOINT + "/" + customerid + "/cards/" + cardid + "/payments" ;
	},
	_getSubscriptionUrlWithId: function(id) {
		return this._getPaymentApiBaseUrl() + this._SUBSCRIPTION_ENDPOINT + "/" + id;
	},
	_getSubscriptionUrlWithIdAndPayment: function(id) {
		return this._getPaymentApiBaseUrl() + this._SUBSCRIPTION_ENDPOINT + "/" + id + "/payments";
	},
	_getCustomerCardUrlWithCustomerIdAndCardIdAndSubscription: function(customerid,cardid) {
		return this._getPaymentApiBaseUrl() + this._CUSTOMER_ENDPOINT + "/" + customerid + "/cards/" + cardid + "/subscriptions" ;
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

	_getPaymentApiBaseUrl: function() {
		var paymentEnvironment = this._paymentsEnvironment;
		var apiBaseUrl = "";
		if(paymentEnvironment === paymayaSdk.ENVIRONMENT.PRODUCTION) {
			apiBaseUrl = Constants.PAYMENTS_SANDBOX_URL;
		} else if(paymentEnvironment === paymayaSdk.ENVIRONMENT.SANDBOX) {
			apiBaseUrl = Constants.PAYMENTS_SANDBOX_URL;
		} else {
			apiBaseUrl = Constants.PAYMENTS_SANDBOX_URL;
		}
		return apiBaseUrl;
	},

	_createAuthorizationToken: function (key1, key2) {
		if(typeof (key2) === 'undefined') {
		  key2 = '';
		}
		return "Basic " + new Buffer(key1 + ":" + key2).toString('base64');
	}
};

module.exports = APIManager;

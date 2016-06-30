function PaymayaSDK() {

	this.ENVIRONMENT = {
		PRODUCTION: "PRODUCTION",
		SANDBOX: "SANDBOX"
	};

};

PaymayaSDK.prototype = {

	initCheckout: function(apiKey, secretKey, environment) {
		this._checkoutApiKey = apiKey;
		this._checkoutSecretKey = secretKey;
		this._checkoutEnvironment = environment;
	},

	initPayments: function(apiKey, secretKey, environment) {
		this._paymentsApiKey = apiKey;
		this._paymentsSecretKey = secretKey;
		this._paymentsEnvironment = environment;
	},

	getCheckoutAPIKey: function() {
		return this._checkoutApiKey;
	},

	getCheckoutEnvironment: function() {
		return this._checkoutEnvironment;
	},

	getPaymentsAPIKey: function() {
		return this._paymentsApiKey;
	},

	getPaymentsEnvironment: function() {
		return this._paymentsEnvironment;
	},

	getCheckoutSecretKey: function() {
		return this._checkoutSecretKey;
	},

	getPaymentsSecretKey: function() {
		return this._paymentsSecretKey;
	},
}

module.exports = new PaymayaSDK();
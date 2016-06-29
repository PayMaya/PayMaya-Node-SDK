function PaymayaSDK() {

	this.ENVIRONMENT = {
		PRODUCTION: "PRODUCTION",
		SANDBOX: "SANDBOX"
	};

};

PaymayaSDK.prototype = {

	initCheckout: function(apiKey, environment) {
		this._checkoutApiKey = apiKey;
		this._checkoutEnvironment = environment;
	},

	initPayments: function(apiKey, environment) {
		this._paymentsApiKey = apiKey;
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
	}
}

module.exports = new PaymayaSDK();
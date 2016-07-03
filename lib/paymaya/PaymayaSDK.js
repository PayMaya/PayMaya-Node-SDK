function PaymayaSDK() {

	this.ENVIRONMENT = {
		PRODUCTION: "PRODUCTION",
		SANDBOX: "SANDBOX"
	};

};

PaymayaSDK.prototype = {

	initCheckout: function(publicFacingApiKey, secretApiKey, environment) {
		this._checkoutPublicFacingApiKey = publicFacingApiKey;
		this._checkoutSecretApiKey = secretApiKey;
		this._checkoutEnvironment = environment;
	},

	initPayments: function(publicFacingApiKey, secretApiKey, environment) {
		this._paymentsPublicFacingApiKey = publicFacingApiKey;
		this._paymentsSecretApiKey = secretApiKey;
		this._paymentsEnvironment = environment;
	},

	getCheckoutPublicFacingApiKey: function() {
		return this._checkoutPublicFacingApiKey;
	},

	getCheckoutEnvironment: function() {
		return this._checkoutEnvironment;
	},

	getPaymentsPublicFacingApiKey: function() {
		return this._paymentsPublicFacingApiKey;
	},

	getPaymentsEnvironment: function() {
		return this._paymentsEnvironment;
	},

	getCheckoutSecretApiKey: function() {
		return this._checkoutSecretApiKey;
	},

	getPaymentsSecretApiKey: function() {
		return this._paymentsSecretApiKey;
	},
}

module.exports = new PaymayaSDK();
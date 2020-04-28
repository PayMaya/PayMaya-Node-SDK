module.exports = Checkout;

var APIManager = require("./../core/APIManager");
var PaymayaApiError = require("./../core/PaymayaApiError");
var paymayaSdk = require("./../PaymayaSDK");
var Promise = require("bluebird");

function Checkout() {
	this._apiManager = new APIManager();
	this.buyer = null;
	this.items = null;
	this.totalAmount = null;
	this.requestReferenceNumber = "";
	this.redirectUrl = null;
	this.id = "";
}

Checkout.prototype = {
	/* PUBLIC METHODS */
	execute: function(callback) {
		if(callback) {
			return this._execute(callback);
		}
		return new Promise(this._getCallback("_execute"));
	},

	retrieve: function(callback) {
		if(callback) {
			return this._retrieve(callback);
		}
		return new Promise(this._getCallback("_retrieve"));
	},

	/* PRIVATE METHODS */
	_getCallback: function(method) {
		var self = this;
		return function(resolve, reject) {
			self[method](function(err, result) {
				if(err) {
					return reject(err);
				}
				resolve(result);
			});
		};
	},

	_execute: function(callback) {
		if(!this.buyer) {
			return callback(new PaymayaApiError(null, {message: "Missing buyer"}));
		}

		if(!this.items) {
			return callback(new PaymayaApiError(null, {message: "Missing items"}));
		}

		if(!this.totalAmount) {
			return callback(new PaymayaApiError(null, {message: "Missing totalAmount"}));
		}

		if(!this.requestReferenceNumber) {
			return callback(new PaymayaApiError(null, {message: "Missing requestReferenceNumber"}));
		}

		var checkoutInformationData = {
			buyer: this.buyer,
			items: this.items,
			totalAmount: this.totalAmount,
			requestReferenceNumber: this.requestReferenceNumber
		};

		if(this.redirectUrl && typeof this.redirectUrl === "object") {
			checkoutInformationData.redirectUrl = this.redirectUrl;
		}

		var self = this;
		var onInitiateCheckout = function(err, response) {
			if(response) {
				self.id = response.checkoutId;
			}
			callback(err, response);
		};

		this._apiManager.executeInitiateCheckout(checkoutInformationData, onInitiateCheckout);
	},

	_retrieve: function(callback) {
		if(!this.id) {
			return callback(new PaymayaApiError(null, {message: "Missing id"}));
		}
		this._apiManager.executeRetrieveCheckout(this.id, callback);
	},

	getStatus: function(callback) {
		this._apiManager.getCheckoutStatus(this.id, callback);
	}
};

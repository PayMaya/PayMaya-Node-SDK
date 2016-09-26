module.exports = Checkout;

var APIManager = require("./../core/APIManager");
var PaymayaApiError = require("./../core/PaymayaApiError");
var paymayaSdk = require("./../PaymayaSDK");

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

	/* PUBLIC FUNCTIONS */
	execute: function(callback) {
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

	retrieve: function(callback) {
		if(!this.id) {
			return callback(new PaymayaApiError(null, {message: "Missing id"}));
		}
		this._apiManager.executeRetrieveCheckout(this.id, callback);
	}
};

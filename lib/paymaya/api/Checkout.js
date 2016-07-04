module.exports = Checkout;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Checkout() {
	this._apiManager = APIManager;
	this.buyer = null;
	this.items = null;
	this.totalAmount = null;
	this.requestReferenceNumber = "";
	this.checkoutId = "";
};

Checkout.prototype = {

	/* PUBLIC FUNCTIONS */
	execute: function(callback) {
		if(!this.buyer) {
			callback("Missing buyer");
			return;
		}

		if(!this.items) {
			callback("Missing items");
			return;
		}

		if(!this.totalAmount) {
			callback("Missing totalAmount");
			return;
		}

		if(!this.requestReferenceNumber) {
			callback("Missing requestReferenceNumber");
			return;
		}

		var checkoutInformationData = {
			buyer: this.buyer,
			items: this.items,
			totalAmount: this.totalAmount,
			requestReferenceNumber: this.requestReferenceNumber
		}
		this._apiManager.executeInitiateCheckout(checkoutInformationData, callback);
	},

	get: function(callback) {
		if(!this.checkoutId) {
			callback("Missing checkoutId");
			return;
		}
		this._apiManager.executeRetrieveCheckout(this.checkoutId, callback);
	},	
};
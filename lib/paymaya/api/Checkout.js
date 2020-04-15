module.exports = Checkout;

var APIManager = require("./../core/APIManager");
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
			callback("Missing id");
			return;
		}
		this._apiManager.executeRetrieveCheckout(this.id, callback);
	},

	getStatus: function(callback) {
		this._apiManager.getCheckoutStatus(this.id, callback);
	}
};

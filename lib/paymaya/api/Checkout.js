module.exports = Checkout;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Checkout() {
	this._apiManager = APIManager;
};

Checkout.prototype = {

	/* PUBLIC FUNCTIONS */
	executeInitiateCheckout: function(options, callback) {
		options = options || {};
		var buyer = options.buyer || {};
		var items = options.items || [];
		var totalAmount = options.totalAmount || {};
		var requestReferenceNumber = options.requestReferenceNumber || "";

		var checkoutInformationData = {
			buyer: buyer,
			items: items,
			totalAmount: totalAmount,
			requestReferenceNumber: requestReferenceNumber
		}
		this._apiManager.executeInitiateCheckout(checkoutInformationData, callback);
	},

	executeRetrieveCheckout: function(checkoutId, callback) {
		this._apiManager.executeRetrieveCheckout(checkoutId, callback);
	},	
};
module.exports = Buyer;

function Buyer(options) {
	options = options || {};

	this.firstName = options.firstName || "";
	this.middleName = options.middleName || "";
	this.lastName = options.lastName || "";
	this.contact = options.contact || {};
	this.shippingAddress = options.shippingAddress || {};
	this.billingAddress = options.billingAddress || {};
}


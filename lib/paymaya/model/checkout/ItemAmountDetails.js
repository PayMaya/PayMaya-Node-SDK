module.exports = ItemAmountDetails;

function ItemAmountDetails(options) {
	options = options || {};

	this.discount = options.discount || "0.00";
	this.serviceCharge = options.serviceCharge || "0.00";
	this.shippingFee = options.shippingFee || "0.00";
	this.tax = options.tax || "0.00";
	this.subTotal = options.subTotal || "0.00";
}


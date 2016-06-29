module.exports = ItemAmountDetails;

function ItemAmountDetails(options) {
	options = options || {};

	this.discount = options.discount || "0.00";
	this.serviceCharge = options.serviceCharge || "0.00";
	this.shippingFee = options.shippingFee || "0.00";
	this.tax = options.tax || "0.00";
	this.subTotal = options.subTotal || "0.00";

	/*
	Object.defineProperty(this, "discount", {
		get: function() { return this.discount }
	});

	Object.defineProperty(this, "serviceCharge", {
		get: function() { return this.serviceCharge }
	});

	Object.defineProperty(this, "shippingFee", {
		get: function() { return this.shippingFee }
	});

	Object.defineProperty(this, "tax", {
		get: function() { return this.tax }
	});

	Object.defineProperty(this, "subTotal", {
		get: function() { return this.subTotal }
	});
	*/
}


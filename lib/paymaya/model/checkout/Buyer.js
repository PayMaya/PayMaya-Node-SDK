module.exports = Buyer;

function Buyer(options) {
	options = options || {};

	this.firstName = options.firstName || "";
	this.middleName = options.middleName || "";
	this.lastName = options.lastName || "";
	this.contact = options.contact || {};
	this.shippingAddress = options.shippingAddress || {};
	this.billingAddress = options.billingAddress || {};

	/*
	Object.defineProperty(this, "firstName", {
		get: function() { return this.firstName }
	});

	Object.defineProperty(this, "middleName", {
		get: function() { return this.middleName }
	});

	Object.defineProperty(this, "lastName", {
		get: function() { return this.lastName }
	});

	Object.defineProperty(this, "contact", {
		get: function() { return this.contact }
	});

	Object.defineProperty(this, "shippingAddress", {
		get: function() { return this.shippingAddress }
	});

	Object.defineProperty(this, "billingAddress", {
		get: function() { return this.billingAddress }
	});
	*/
}


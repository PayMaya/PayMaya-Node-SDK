module.exports = Address;

function Address(options) {
	options = options || {};

	this.line1 = options.line1 || "";
	this.line2 = options.line2 || "";
	this.city = options.city || "";
	this.state = options.state || "";
	this.zipCode = options.zipCode || "";
	this.countryCode = options.countryCode || "";

	/*
	Object.defineProperty(this, "line1", {
		get: function() { return this.line1 }
	});

	Object.defineProperty(this, "line2", {
		get: function() { return this.line2 }
	});

	Object.defineProperty(this, "city", {
		get: function() { return this.city }
	});

	Object.defineProperty(this, "state", {
		get: function() { return this.state }
	});

	Object.defineProperty(this, "zipCode", {
		get: function() { return this.zipCode }
	});

	Object.defineProperty(this, "countryCode", {
		get: function() { return this.countryCode }
	});
	*/
}

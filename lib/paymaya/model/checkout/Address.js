module.exports = Address;

function Address(options) {
	options = options || {};

	this.line1 = options.line1 || "";
	this.line2 = options.line2 || "";
	this.city = options.city || "";
	this.state = options.state || "";
	this.zipCode = options.zipCode || "";
	this.countryCode = options.countryCode || "";
}

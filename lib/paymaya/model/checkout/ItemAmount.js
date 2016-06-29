module.exports = ItemAmount;

function ItemAmount(options) {
	options = options || {};

	this.currency = options.currency || "";
	this.value = options.value || "0.00";
	this.details = options.details || "";

	/*
	Object.defineProperty(this, "currency", {
		get: function() { return this.currency }
	});

	Object.defineProperty(this, "value", {
		get: function() { return this.value }
	});

	Object.defineProperty(this, "details", {
		get: function() { return this.details }
	});
	*/
}
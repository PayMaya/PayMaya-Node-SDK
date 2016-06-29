module.exports = Item;

function Item(options) {
	options = options || {};

	this.name = options.name || "";
	this.code = options.code || "";
	this.description = options.description || "";
	this.quantity = options.quantity || "0.00";
	this.amount = options.amount || {};
	this.totalAmount = options.totalAmount || {};

	/*
	Object.defineProperty(this, "name", {
		get: function() { return this.name }
	});

	Object.defineProperty(this, "code", {
		get: function() { return this.code }
	});

	Object.defineProperty(this, "description", {
		get: function() { return this.description }
	});

	Object.defineProperty(this, "quantity", {
		get: function() { return this.quantity }
	});

	Object.defineProperty(this, "amount", {
		get: function() { return this.amount }
	});

	Object.defineProperty(this, "totalAmount", {
		get: function() { return this.totalAmount }
	});
	*/
}


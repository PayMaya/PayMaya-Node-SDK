module.exports = Item;

function Item(options) {
	options = options || {};

	this.name = options.name || "";
	this.code = options.code || "";
	this.description = options.description || "";
	this.quantity = options.quantity || "0.00";
	this.amount = options.amount || {};
	this.totalAmount = options.totalAmount || {};
}


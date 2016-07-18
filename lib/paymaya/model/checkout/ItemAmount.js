module.exports = ItemAmount;

function ItemAmount(options) {
	options = options || {};

	this.currency = options.currency || "";
	this.value = options.value || "0.00";
	this.details = options.details || "";
}
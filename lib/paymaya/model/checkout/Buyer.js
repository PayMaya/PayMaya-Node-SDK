module.exports = Buyer;

var BasicCustomer = require('../BasicCustomer');

function Buyer() {
	this.shippingAddress = null;
}
Object.setPrototypeOf(Buyer,BasicCustomer);

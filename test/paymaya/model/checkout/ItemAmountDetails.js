var chai = require('chai');
var should = chai.should();
var ItemAmountDetails = require("./../../../../lib/paymaya/model/checkout/ItemAmountDetails");

describe('ItemAmountDetails', function() {

	var itemAmountDetails;
	var options = {
		shippingFee: "14.00",
		tax: "5.00",
		subTotal: "50.00" 
	};

	before(function(done) {
		itemAmountDetails = new ItemAmountDetails();
		itemAmountDetails.shippingFee = options.shippingFee;
		itemAmountDetails.tax = options.tax;
		itemAmountDetails.subTotal = options.subTotal;
		done();
	});
	
	it('should have shippingFee property', function(done) {
		itemAmountDetails.should.have.property('shippingFee');
		done();
	});

	it('should have tax property', function(done) {
		itemAmountDetails.should.have.property('tax');
		done();
	});

	it('should have subTotal property', function(done) {
		itemAmountDetails.should.have.property('subTotal');
		done();
	});

	it('should return correct shippingFee value', function(done) {
		itemAmountDetails.shippingFee.should.equal(options.shippingFee);
		done();
	});

	it('should return correct tax value', function(done) {
		itemAmountDetails.tax.should.equal(options.tax);
		done();
	});

	it('should return correct subTotal value', function(done) {
		itemAmountDetails.subTotal.should.equal(options.subTotal);
		done();
	});
});
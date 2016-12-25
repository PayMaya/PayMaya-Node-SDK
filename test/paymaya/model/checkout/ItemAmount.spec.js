var chai = require('chai');
var should = chai.should();
var ItemAmount = require("./../../../../lib/paymaya/model/checkout/ItemAmount");
var ItemAmountDetails = require("./../../../../lib/paymaya/model/checkout/ItemAmountDetails");

describe('ItemAmount', function() {

	var itemAmount;
	
	var itemAmountDetailsOptions = {
		shippingFee: "14.00",
		tax: "5.00",
		subTotal: "50.00" 
	};

	var itemAmountOptions = {
		currency: "PHP",
		value: "69.00"
	};

	before(function(done) {
		var itemAmountDetails = new ItemAmountDetails();
		itemAmountDetails.shippingFee = itemAmountDetailsOptions.shippingFee;
		itemAmountDetails.tax = itemAmountDetailsOptions.tax;
		itemAmountDetails.subTotal = itemAmountDetailsOptions.subTotal;
		itemAmountOptions.details = itemAmountDetails;

		itemAmount = new ItemAmount();
		itemAmount.currency = itemAmountOptions.currency;
		itemAmount.value = itemAmountOptions.value;
		itemAmount.details = itemAmountOptions.details;
		done();
	});
	
	it('should have currency property', function(done) {
		itemAmount.should.have.property('currency');
		done();
	});

	it('should have value property', function(done) {
		itemAmount.should.have.property('value');
		done();
	});

	it('should have details property', function(done) {
		itemAmount.should.have.property('details');
		done();
	});

	it('should return correct currency value', function(done) {
		itemAmount.currency.should.equal(itemAmountOptions.currency);
		done();
	});

	it('should return correct value value', function(done) {
		itemAmount.value.should.equal(itemAmountOptions.value);
		done();
	});

	it('should return correct details value', function(done) {
		itemAmount.details.should.equal(itemAmountOptions.details);
		done();
	});
});
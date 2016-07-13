var chai = require('chai');
var should = chai.should();
var Item = require("./../../../../lib/paymaya/model/checkout/Item");
var ItemAmount = require("./../../../../lib/paymaya/model/checkout/ItemAmount");
var ItemAmountDetails = require("./../../../../lib/paymaya/model/checkout/ItemAmountDetails");

describe('Item', function() {

	var item;

	var itemAmountDetailsOptions = {
		shippingFee: "14.00",
		tax: "5.00",
		subTotal: "50.00" 
	};

	var itemAmountOptions = {
		currency: "PHP",
		value: "69.00",
		details: new ItemAmountDetails(itemAmountDetailsOptions)
	};

	var itemOptions = {
		name: "Leather Belt",
		code: "pm_belt",
		description: "Medium-sv",
		amount: new ItemAmount(itemAmountOptions),
		totalAmount: new ItemAmount(itemAmountOptions)
	};

	before(function(done) {
		item = new Item(itemOptions);
		done();
	});
	
	it('should have name property', function(done) {
		item.should.have.property('name');
		done();
	});

	it('should have code property', function(done) {
		item.should.have.property('code');
		done();
	});

	it('should have description property', function(done) {
		item.should.have.property('description');
		done();
	});

	it('should have amount property', function(done) {
		item.should.have.property('amount');
		done();
	});

	it('should have totalAmount property', function(done) {
		item.should.have.property('totalAmount');
		done();
	});

	it('should return correct name value', function(done) {
		item.name.should.equal(itemOptions.name);
		done();
	});

	it('should return correct code value', function(done) {
		item.code.should.equal(itemOptions.code);
		done();
	});

	it('should return correct description value', function(done) {
		item.description.should.equal(itemOptions.description);
		done();
	});

	it('should return correct amount value', function(done) {
		item.amount.should.equal(itemOptions.amount);
		done();
	});

	it('should return correct totalAmount value', function(done) {
		item.totalAmount.should.equal(itemOptions.totalAmount);
		done();
	});
});
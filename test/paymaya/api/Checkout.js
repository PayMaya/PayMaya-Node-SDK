var keys = require("./../../keys.json");
var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Checkout = require("./../../../lib/paymaya/api/Checkout");
var PaymayaApiError = require("./../../../lib/paymaya/core/PaymayaApiError");

describe('Checkout', function() {

	var checkout;
	var items = [];

	var address = {
	  	line1 : "9F Robinsons Cybergate 3",
	  	line2 : "Pioneer Street",
	  	city : "Mandaluyong City",
	  	state : "Metro Manila",
	  	zipCode : "12345",
	  	countryCode : "PH"
  	};

	var contact = {
  		phone : "+63(2)1234567890",
  		email : "paymayabuyer1@gmail.com"
  	};

	var buyer = {
		firstName : "John",
		middleName : "Michaels",
		lastName : "Doe",
		contact: contact,
		shippingAddress: address,
		billingAddress: address
	};

	var itemAmountDetails = {
		shippingFee: "14.00",
		tax: "5.00",
		subTotal: "50.00"
	};

	var itemAmount = {
		currency: "PHP",
		value: "69.00",
		details: itemAmount,
	};

	var item = {
		name: "Leather Belt",
		code: "pm_belt",
		description: "Medium-sv",
		quantity: "1",
		amount: itemAmount,
		totalAmount: itemAmount
	};

	items.push(item);

	var requestReferenceNumber = "123456789";

	before(function() {
		paymayaSdk.initCheckout(keys.publicKey, keys.secretKey, paymayaSdk.ENVIRONMENT.SANDBOX);
	});

	context("when parameters are valid", function() {
		before(function() {
			checkout = new Checkout();
			checkout.buyer = buyer;
			checkout.items = items;
			checkout.totalAmount = item.totalAmount;
			checkout.requestReferenceNumber = requestReferenceNumber;
		});

		it('should execute initiate checkout successfully', function(done) {
			var callback = function(err, response) {
				should.not.exist(err);
				should.exist(response);
				response.should.have.property('checkoutId');
				response.should.have.property('redirectUrl');
				done();
			}
			checkout.execute(callback);
		});

		it('should execute retrieve checkout successfully', function(done) {
			var callback = function(err, response) {
				should.not.exist(err);
				should.exist(response);
				response.should.have.property('merchant');
				response.should.have.property('buyer');
				response.should.have.property('items');
				response.should.have.property('status');
				response.should.have.property('id');
				response.should.have.property('totalAmount');
				response.should.have.property('requestReferenceNumber');
				response.should.have.property('paymentStatus');
				response.should.have.property('paymentType');
				response.should.have.property('voidStatus');
				response.should.have.property('transactionReferenceNumber');
				response.should.have.property('receiptNumber');
				done();
			}
			checkout.retrieve(callback);
		});
	});

	context("when parameters are invalid", function() {
		beforeEach(function() {
			checkout = new Checkout();
		});

		context("when buyer is missing", function() {
			it("should return an error", function(done) {
				checkout.items = items;
				checkout.totalAmount = itemAmount;
				checkout.requestReferenceNumber = requestReferenceNumber;
				checkout.execute(function(err, response) {
					err.should.exist;
					err.should.be.instanceOf(PaymayaApiError);
					err.message.should.equal("Missing buyer");
					done();
				});
			});
		});

		context("when items are missing", function() {
			it("should return an error", function(done) {
				checkout.buyer = buyer;
				checkout.totalAmount = itemAmount;
				checkout.requestReferenceNumber = requestReferenceNumber;
				checkout.execute(function(err, response) {
					err.should.exist;
					err.should.be.instanceOf(PaymayaApiError);
					err.message.should.equal("Missing items");
					done();
				});
			});
		});

		context("when total amount is missing", function() {
			it("should return an error", function(done) {
				checkout.buyer = buyer;
				checkout.items = items;
				checkout.requestReferenceNumber = requestReferenceNumber;
				checkout.execute(function(err, response) {
					err.should.exist;
					err.should.be.instanceOf(PaymayaApiError);
					err.message.should.equal("Missing totalAmount");
					done();
				});
			});
		});

		context("when request reference number is missing", function() {
			it("should return an error", function(done) {
				checkout.buyer = buyer;
				checkout.items = items;
				checkout.totalAmount = itemAmount;
				checkout.execute(function(err, response) {
					err.should.exist;
					err.should.be.instanceOf(PaymayaApiError);
					err.message.should.equal("Missing requestReferenceNumber");
					done();
				});
			});
		});
	});
});

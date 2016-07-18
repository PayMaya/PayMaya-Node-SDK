var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Checkout = require("./../../../lib/paymaya/api/Checkout");
var Buyer = require("./../../../lib/paymaya/model/checkout/Buyer");
var Address = require("./../../../lib/paymaya/model/checkout/Address");
var Contact = require("./../../../lib/paymaya/model/checkout/Contact");
var Item = require("./../../../lib/paymaya/model/checkout/Item");
var ItemAmount = require("./../../../lib/paymaya/model/checkout/ItemAmount");
var ItemAmountDetails = require("./../../../lib/paymaya/model/checkout/ItemAmountDetails");

describe('Checkout', function() {

	var checkout;
	var buyer;
	var items = [];

	var addressOptions = {
	  	line1 : "9F Robinsons Cybergate 3",
	  	line2 : "Pioneer Street",
	  	city : "Mandaluyong City",
	  	state : "Metro Manila",
	  	zipCode : "12345",
	  	countryCode : "PH"
  	};

	var contactOptions = {
  		phone : "+63(2)1234567890",
  		email : "paymayabuyer1@gmail.com"
  	};

	var buyerOptions = {
		firstName : "John",
		middleName : "Michaels",
		lastName : "Doe"
	};

	var itemAmountDetailsOptions = {
		shippingFee: "14.00",
		tax: "5.00",
		subTotal: "50.00" 
	};

	var itemAmountOptions = {
		currency: "PHP",
		value: "69.00"
	};

	var itemOptions = {
		name: "Leather Belt",
		code: "pm_belt",
		description: "Medium-sv"
	};

	var requestReferenceNumber = "123456789";

	before(function(done) {
		paymayaSdk.initCheckout("pk-iaioBC2pbY6d3BVRSebsJxghSHeJDW4n6navI7tYdrN", "sk-uh4ZFfx9i0rZpKN6CxJ826nVgJ4saGGVAH9Hk7WrY6Q", paymayaSdk.ENVIRONMENT.SANDBOX);

		var contact = new Contact();
		contact.phone = contactOptions.phone;
  		contact.email = contactOptions.email;
  		buyerOptions.contact = contact;

		var address = new Address();
		address.line1 = addressOptions.line1;
	  	address.line2 = addressOptions.line2;
	  	address.city = addressOptions.city;
	  	address.state = addressOptions.state;
	  	address.zipCode = addressOptions.zipCode;
	  	address.countryCode = addressOptions.countryCode;
	  	buyerOptions.shippingAddress = address;
	  	buyerOptions.billingAddress = address;

		buyer = new Buyer();
		buyer.firstName = buyerOptions.firstName;
		buyer.middleName = buyerOptions.middleName;
		buyer.lastName = buyerOptions.lastName;
		buyer.contact = buyerOptions.contact;
		buyer.shippingAddress = buyerOptions.shippingAddress;
		buyer.billingAddress = buyerOptions.billingAddress;

		var itemAmountDetails = new ItemAmountDetails();
		itemAmountDetails.shippingFee = itemAmountDetailsOptions.shippingFee;
		itemAmountDetails.tax = itemAmountDetailsOptions.tax;
		itemAmountDetails.subTotal = itemAmountDetailsOptions.subTotal;
		itemAmountOptions.details = itemAmountDetails;

		var itemAmount = new ItemAmount();
		itemAmount.currency = itemAmountOptions.currency;
		itemAmount.value = itemAmountOptions.value;
		itemAmount.details = itemAmountOptions.details;
		itemOptions.amount = itemAmount;
		itemOptions.totalAmount = itemAmount;

		item = new Item();
		item.name = itemOptions.name;
		item.code = itemOptions.code;
		item.description = itemOptions.description;
		item.amount = itemOptions.amount;
		item.totalAmount = itemOptions.totalAmount;
		items.push(item);

		checkout = new Checkout();
		checkout.buyer = buyer;
		checkout.items = items;
		checkout.totalAmount = itemOptions.totalAmount;
		checkout.requestReferenceNumber = requestReferenceNumber;
		done();
	});
	
	it('should have buyer property', function(done) {
		checkout.should.have.property('buyer');
		done();
	});

	it('should have items property', function(done) {
		checkout.should.have.property('items');
		done();
	});

	it('should have totalAmount property', function(done) {
		checkout.should.have.property('totalAmount');
		done();
	});

	it('should have requestReferenceNumber property', function(done) {
		checkout.should.have.property('requestReferenceNumber');
		done();
	});

	it('should return correct buyer value', function(done) {
		checkout.buyer.should.equal(buyer);
		done();
	});

	it('should return correct items value', function(done) {
		checkout.items.should.equal(items);
		done();
	});

	it('should return correct totalAmount value', function(done) {
		checkout.totalAmount.should.equal(itemOptions.totalAmount);
		done();
	});

	it('should return correct requestReferenceNumber value', function(done) {
		checkout.requestReferenceNumber.should.equal(requestReferenceNumber);
		done();
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
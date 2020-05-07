var chai = require('chai');
var should = chai.should();
var Buyer = require("./../../../../lib/paymaya/model/checkout/Buyer");
var Address = require("./../../../../lib/paymaya/model/checkout/Address");
var Contact = require("./../../../../lib/paymaya/model/checkout/Contact");

describe('Buyer', function() {

	var buyer;

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

	before(function(done) {
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

		done();
	});
	
	it('should have firstName property', function(done) {
		buyer.should.have.property('firstName');
		done();
	});

	it('should have middleName property', function(done) {
		buyer.should.have.property('middleName');
		done();
	});

	it('should have lastName property', function(done) {
		buyer.should.have.property('lastName');
		done();
	});

	it('should have contact property', function(done) {
		buyer.should.have.property('contact');
		done();
	});

	it('should have shippingAddress property', function(done) {
		buyer.should.have.property('shippingAddress');
		done();
	});

	it('should have billingAddress property', function(done) {
		buyer.should.have.property('billingAddress');
		done();
	});

	it('should return correct firstName value', function(done) {
		buyer.firstName.should.equal(buyerOptions.firstName);
		done();
	});

	it('should return correct middleName value', function(done) {
		buyer.middleName.should.equal(buyerOptions.middleName);
		done();
	});

	it('should return correct lastName value', function(done) {
		buyer.lastName.should.equal(buyerOptions.lastName);
		done();
	});

	it('should return correct contact value', function(done) {
		buyer.contact.should.equal(buyerOptions.contact);
		done();
	});

	it('should return correct shippingAddress value', function(done) {
		buyer.shippingAddress.should.equal(buyerOptions.shippingAddress);
		done();
	});

	it('should return correct billingAddress value', function(done) {
		buyer.billingAddress.should.equal(buyerOptions.billingAddress);
		done();
	});
});
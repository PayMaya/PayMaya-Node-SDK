var chai = require('chai');
var should = chai.should();
var BasicCustomer = require("./../../../lib/paymaya/model/BasicCustomer");
var Address = require("./../../../lib/paymaya/model/Address");
var Contact = require("./../../../lib/paymaya/model/Contact");

describe('BasicCustomer', function() {

	var basicCustomer;

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

	var basicCustomerOptions = {
		firstName : "John",
		middleName : "Michaels",
		lastName : "Doe"
	};

	before(function(done) {
		var contact = new Contact();
		contact.phone = contactOptions.phone;
  		contact.email = contactOptions.email;
  		basicCustomerOptions.contact = contact;

		var address = new Address();
		  address.line1 = addressOptions.line1;
	  	address.line2 = addressOptions.line2;
	  	address.city = addressOptions.city;
	  	address.state = addressOptions.state;
	  	address.zipCode = addressOptions.zipCode;
	  	address.countryCode = addressOptions.countryCode;
	  	basicCustomerOptions.billingAddress = address;

		basicCustomer = new BasicCustomer();
		basicCustomer.firstName = basicCustomerOptions.firstName;
		basicCustomer.middleName = basicCustomerOptions.middleName;
		basicCustomer.lastName = basicCustomerOptions.lastName;
		basicCustomer.contact = basicCustomerOptions.contact;
		basicCustomer.billingAddress = basicCustomerOptions.billingAddress;

		done();
	});

	it('should have firstName property', function(done) {
		basicCustomer.should.have.property('firstName');
		done();
	});

	it('should have middleName property', function(done) {
		basicCustomer.should.have.property('middleName');
		done();
	});

	it('should have lastName property', function(done) {
		basicCustomer.should.have.property('lastName');
		done();
	});

	it('should have contact property', function(done) {
		basicCustomer.should.have.property('contact');
		done();
	});

	it('should have billingAddress property', function(done) {
		basicCustomer.should.have.property('billingAddress');
		done();
	});

	it('should return correct firstName value', function(done) {
		basicCustomer.firstName.should.equal(basicCustomerOptions.firstName);
		done();
	});

	it('should return correct middleName value', function(done) {
		basicCustomer.middleName.should.equal(basicCustomerOptions.middleName);
		done();
	});

	it('should return correct lastName value', function(done) {
		basicCustomer.lastName.should.equal(basicCustomerOptions.lastName);
		done();
	});

	it('should return correct contact value', function(done) {
		basicCustomer.contact.should.equal(basicCustomerOptions.contact);
		done();
	});

	it('should return correct billingAddress value', function(done) {
		basicCustomer.billingAddress.should.equal(basicCustomerOptions.billingAddress);
		done();
	});
});

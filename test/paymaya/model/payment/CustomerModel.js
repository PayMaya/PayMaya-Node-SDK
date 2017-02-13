var chai = require('chai');
var should = chai.should();
var CustomerModel = require("./../../../../lib/paymaya/model/payment/CustomerModel");
var Address = require("./../../../../lib/paymaya/model/Address");
var Contact = require("./../../../../lib/paymaya/model/Contact");
var Metadata = require("./../../../../lib/paymaya/model/customer/Metadata");

describe('CustomerModel', function() {

	var customerModel;

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

	var customerModelOptions = {
		firstName : "John",
		middleName : "Michaels",
		lastName : "Doe",
    birthday :"1987-10-10",
    sex :"f"
	};

	before(function(done) {
		var contact = new Contact();
		contact.phone = contactOptions.phone;
  		contact.email = contactOptions.email;
  		customerModelOptions.contact = contact;

		var address = new Address();
		  address.line1 = addressOptions.line1;
	  	address.line2 = addressOptions.line2;
	  	address.city = addressOptions.city;
	  	address.state = addressOptions.state;
	  	address.zipCode = addressOptions.zipCode;
	  	address.countryCode = addressOptions.countryCode;
	  	customerModelOptions.billingAddress = address;

    var metadata = new Metadata();
    metadata = {};
    customerModelOptions.metadata = metadata;

		customerModel = new CustomerModel();
		customerModel.firstName = customerModelOptions.firstName;
		customerModel.middleName = customerModelOptions.middleName;
		customerModel.lastName = customerModelOptions.lastName;
		customerModel.contact = customerModelOptions.contact;
    customerModel.birthday = customerModelOptions.birthday;
		customerModel.sex = customerModelOptions.sex;
		customerModel.billingAddress = customerModelOptions.billingAddress;
    customerModel.metadata = customerModelOptions.metadata;

		done();
	});

	it('should have firstName property', function(done) {
		customerModel.should.have.property('firstName');
		done();
	});

	it('should have middleName property', function(done) {
		customerModel.should.have.property('middleName');
		done();
	});

	it('should have lastName property', function(done) {
		customerModel.should.have.property('lastName');
		done();
	});

	it('should have contact property', function(done) {
		customerModel.should.have.property('contact');
		done();
	});

  it('should have birthday property', function(done) {
		customerModel.should.have.property('birthday');
		done();
	});

  it('should have sex property', function(done) {
		customerModel.should.have.property('sex');
		done();
	});

	it('should have billingAddress property', function(done) {
		customerModel.should.have.property('billingAddress');
		done();
	});

	it('should return correct firstName value', function(done) {
		customerModel.firstName.should.equal(customerModelOptions.firstName);
		done();
	});

	it('should return correct middleName value', function(done) {
		customerModel.middleName.should.equal(customerModelOptions.middleName);
		done();
	});

	it('should return correct lastName value', function(done) {
		customerModel.lastName.should.equal(customerModelOptions.lastName);
		done();
	});

	it('should return correct contact value', function(done) {
		customerModel.contact.should.equal(customerModelOptions.contact);
		done();
	});

  it('should return correct birthday value', function(done) {
    customerModel.birthday.should.equal(customerModelOptions.birthday);
    done();
  });

  it('should return correct sex value', function(done) {
		customerModel.sex.should.equal(customerModelOptions.sex);
		done();
	});

	it('should return correct billingAddress value', function(done) {
		customerModel.billingAddress.should.equal(customerModelOptions.billingAddress);
		done();
	});
});

var chai = require('chai');
var should = chai.should();
var Contact = require("./../../../../lib/paymaya/model/checkout/Contact");

describe('Contact', function() {

	var contact;
	var options = {
  		phone : "+63(2)1234567890",
  		email : "paymayabuyer1@gmail.com"
  	};

	before(function(done) {
		contact = new Contact();
		contact.phone = options.phone;
		contact.email = options.email;
		done();
	});
	
	it('should have phone property', function(done) {
		contact.should.have.property('phone');
		done();
	});

	it('should have email property', function(done) {
		contact.should.have.property('email');
		done();
	});

	it('should return correct phone value', function(done) {
		contact.phone.should.equal(options.phone);
		done();
	});

	it('should return correct email value', function(done) {
		contact.email.should.equal(options.email);
		done();
	});
});
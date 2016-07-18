var chai = require('chai');
var should = chai.should();
var Address = require("./../../../../lib/paymaya/model/checkout/Address");

describe('Address', function() {

	var address;
	var options = {
		line1 : "9F Robinsons Cybergate 3",
	  	line2 : "Pioneer Street",
	  	city : "Mandaluyong City",
	  	state : "Metro Manila",
	  	zipCode : "12345",
	  	countryCode : "PH"
	};

	before(function(done) {
		address = new Address();
		address.line1 = options.line1;
	  	address.line2 = options.line2;
	  	address.city = options.city;
	  	address.state = options.state;
	  	address.zipCode = options.zipCode;
	  	address.countryCode = options.countryCode;
		done();
	});
	
	it('should have line1 property', function(done) {
		address.should.have.property('line1');
		done();
	});

	it('should have line2 property', function(done) {
		address.should.have.property('line2');
		done();
	});

	it('should have city property', function(done) {
		address.should.have.property('city');
		done();
	});

	it('should have state property', function(done) {
		address.should.have.property('state');
		done();
	});

	it('should have zipCode property', function(done) {
		address.should.have.property('zipCode');
		done();
	});

	it('should have countryCode property', function(done) {
		address.should.have.property('countryCode');
		done();
	});

	it('should return correct line1 value', function(done) {
		address.line1.should.equal(options.line1);
		done();
	});

	it('should return correct line2 value', function(done) {
		address.line2.should.equal(options.line2);
		done();
	});

	it('should return correct city value', function(done) {
		address.city.should.equal(options.city);
		done();
	});

	it('should return correct state value', function(done) {
		address.state.should.equal(options.state);
		done();
	});

	it('should return correct zipCode value', function(done) {
		address.zipCode.should.equal(options.zipCode);
		done();
	});

	it('should return correct countryCode value', function(done) {
		address.countryCode.should.equal(options.countryCode);
		done();
	});
});
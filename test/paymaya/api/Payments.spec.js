var chai = require('chai');
var should = chai.should();
var Payments = require("./../../../lib/paymaya/api/Payments");

describe('Payments', function() {

	var payments;

	before(function(done) {
		payments = new Payments();
		done();
	});
});
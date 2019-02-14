var chai = require('chai');
var should = chai.should();
var TotalAmount = require("./../../../lib/paymaya/model/TotalAmount");

describe('TotalAmount',function(){
  var totalAmount;

  var totalAmountOptions = {
    amount:"",
    currency:""
  }

  before(function(done){
    totalAmount = new TotalAmount();
    totalAmount.amount = totalAmountOptions.amount;
    totalAmount.currency = totalAmountOptions.currency;
    done();
  })

  it('should have amount property', function(done) {
		totalAmount.should.have.property('amount');
		done();
	});

  it('should have currency property', function(done) {
		totalAmount.should.have.property('currency');
		done();
	});

  it('should return correct amount value', function(done) {
		totalAmount.amount.should.equal(totalAmount.amount);
		done();
	});

  it('should return correct currency value', function(done) {
		totalAmount.currency.should.equal(totalAmount.currency);
		done();
	});


})

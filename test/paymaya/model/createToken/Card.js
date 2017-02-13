var chai = require('chai');
var should = chai.should();
var Card = require("./../../../../lib/paymaya/model/createToken/Card");


describe('Card',function(){
  var card;

  var cardOptions = {
    number:"",
    expMonth:"",
    expYear:"",
    cvc:""
  }

  before(function(done){
    card = new Card();
    card.number = cardOptions.number;
    card.expMonth = cardOptions.expMonth;
    card.expYear = cardOptions.expYear;
    card.cvc = cardOptions.cvc;
    done();
  })

  it('should have number property', function(done) {
    card.should.have.property('number');
    done();
  });

  it('should have expMonth property', function(done) {
    card.should.have.property('expMonth');
    done();
  });

  it('should have expYear property', function(done) {
    card.should.have.property('expYear');
    done();
  });

  it('should have cvc property', function(done) {
    card.should.have.property('cvc');
    done();
  });


})

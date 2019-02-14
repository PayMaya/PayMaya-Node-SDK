var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var CreateToken = require("./../../../lib/paymaya/api/CreateToken");
var CardModel = require("./../../../lib/paymaya/model/CreateToken/Card");


describe('CreateToken',function(){
  var card;
  var cardModel;

  var cardOptions = {
    number:"4123450131004443",
    expMonth: "05",
    expYear: "2017",
    cvc:"111"
  }

  before(function(done){
    cardModel = new CardModel();
    cardModel.number = cardOptions.number;
    cardModel.expMonth = cardOptions.expMonth;
    cardModel.expYear = cardOptions.expYear;
    cardModel.cvc = cardOptions.cvc;

    createToken = new CreateToken();
    createToken.card = cardModel

    done();
  })

  it('should have card property', function(done) {
    createToken.should.have.property('card');
    done();
  });

  it('should return correct card value', function(done) {
    createToken.card.should.equal(cardModel);
    done();
  });

  it('should execute create token successfully', function(done) {
    var callback = function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.should.have.property('state');
        response.should.have.property('paymentTokenId');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    createToken.createToken(callback);
  });
})

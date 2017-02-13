var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Card = require("./../../../lib/paymaya/api/Card");
var RedirectUrl = require("./../../../lib/paymaya/model/cardVault/RedirectUrl");


describe('Card',function(){
  var card;
  var redirectUrl;

  var paymentTokenId = "tSROLnH4V2bIXfulDZ2UuYIjFcdiUI4XfWreD2NHzR3lXlIPpjaBqXTvXijbOF4oPNEQ81wtliHfRTCczgvuKtilWnKjrTqkfbmBnUmbehDkgpqYXwchFyc4UH1ixVMhcNfX4ERHjfvkYB6eMQgUGgdWvrjDDeqrG0jI";

  var isDefault = true;

  var redirectUrlOptions = {
      success:"http://localhost:3000/",
      failed:"http://localhost:3000/",
      cancel:"http://localhost:3000/"
  }

  var customerId = "451fef71-0a8e-4bcd-93c2-d3c9f0fe5004";

  before(function(done){
    paymayaSdk.initPayments("pk-N1hDJOIHQi8LZwVkaeIobtswQmcEUnCUlPyIim7YStd", "sk-HWoAEuUPWRvmHkE2wLIzdSGgUAjQUVURyagItskrMjt", paymayaSdk.ENVIRONMENT.SANDBOX);

    redirectUrl = new RedirectUrl();
    redirectUrl.success = redirectUrlOptions.success;
    redirectUrl.failed = redirectUrlOptions.failed;
    redirectUrl.cancel = redirectUrlOptions.cancel;

    card = new Card();
    card.redirectUrl = redirectUrl;
    card.paymentTokenId = paymentTokenId;
    card.isDefault = isDefault;
    card.customerId = customerId;

    done();
  })

  it('should have paymentTokenId property', function(done) {
    card.should.have.property('paymentTokenId');
    done();
  });

  it('should have isDefault property', function(done) {
    card.should.have.property('isDefault');
    done();
  });

  it('should have redirectUrl property', function(done) {
    card.should.have.property('redirectUrl');
    done();
  });

  it('should have customerId property', function(done) {
    card.should.have.property('customerId');
    done();
  });

  it('should return correct paymentTokenId value', function(done) {
    card.paymentTokenId.should.equal(paymentTokenId);
    done();
  });

  it('should return correct isDefault value', function(done) {
    card.isDefault.should.equal(isDefault);
    done();
  });

  it('should return correct redirectUrl value', function(done) {
    card.redirectUrl.should.equal(redirectUrl);
    done();
  });

  it('should execute save card successfully', function(done) {
    var callback = function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.should.have.property('state');
        response.should.have.property('cardTokenId');
        response.should.have.property('cardType');
        response.should.have.property('maskedPan');
        response.should.have.property('verificationUrl');
        response.should.have.property('default');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        response.should.have.property('id');
        done();
    }
    card.save(callback);
  });

  it('should execute list card successfully', function(done) {
    var callback = function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.should.have.property('state');
        response.should.have.property('cardTokenId');
        response.should.have.property('cardType');
        response.should.have.property('maskedPan');
        response.should.have.property('default');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    card.listAll(callback);
  });

  it('should execute retrieve card successfully', function(done) {
    var callback = function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.should.have.property('state');
        response.should.have.property('cardTokenId');
        response.should.have.property('cardType');
        response.should.have.property('maskedPan');
        response.should.have.property('default');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    card.retrieve(callback);
  });

  it('should execute update card successfully', function(done) {
    var callback = function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.should.have.property('state');
        response.should.have.property('cardTokenId');
        response.should.have.property('cardType');
        response.should.have.property('maskedPan');
        response.should.have.property('default');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    card.update(callback);
  });

  it('should execute delete card successfully', function(done) {
    var callback = function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.should.have.property('state');
        response.should.have.property('cardTokenId');
        response.should.have.property('cardType');
        response.should.have.property('maskedPan');
        response.should.have.property('default');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        done();
    }
    card.delete(callback);
  });

  it('should execute payment card successfully', function(done) {
    var callback = function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.should.have.property('id');
        response.should.have.property('isPaid');
        response.should.have.property('status');
        response.should.have.property('amount');
        response.should.have.property('currency');
        response.should.have.property('createdAt');
        response.should.have.property('updatedAt');
        response.should.have.property('description');
        response.should.have.property('paymentTokenId');
        done();
    }
    card.payment(callback);
  });
})

var chai = require('chai');
var should = chai.should();
var paymayaSdk = require("./../../lib/paymaya/PaymayaSDK");

describe('PaymayaSDK', function() {

  var publicApiKey = "pk-iaioBC2pbY6d3BVRSebsJxghSHeJDW4n6navI7tYdrN";
  var secretApiKey = "sk-uh4ZFfx9i0rZpKN6CxJ826nVgJ4saGGVAH9Hk7WrY6Q";
  var environment = paymayaSdk.ENVIRONMENT.SANDBOX;

  it('should initiate SDK in initCheckout', function(done) {
    paymayaSdk.initCheckout(publicApiKey, secretApiKey, environment);
  	done();
  });

  it('should initiate SDK in initPayments', function(done) {
    paymayaSdk.initPayments(publicApiKey, secretApiKey, environment);
  	done();
  });

  it('should return correct Checkout Public Api key', function(done) {
    paymayaSdk.getCheckoutPublicApiKey().should.equal(publicApiKey);
  	done();
  });

  it('should return correct Checkout Secret Api key', function(done) {
    paymayaSdk.getCheckoutSecretApiKey().should.equal(secretApiKey);
  	done();
  });

  it('should return correct Checkout Environment', function(done) {
    paymayaSdk.getCheckoutEnvironment().should.equal(environment);
  	done();
  });

  it('should return correct Payments Public Api key', function(done) {
    paymayaSdk.getPaymentsPublicApiKey().should.equal(publicApiKey);
  	done();
  });

  it('should return correct Payments Secret Api key', function(done) {
    paymayaSdk.getPaymentsSecretApiKey().should.equal(secretApiKey);
  	done();
  });

  it('should return correct Payments Environment', function(done) {
    paymayaSdk.getPaymentsEnvironment().should.equal(environment);
  	done();
  });
});
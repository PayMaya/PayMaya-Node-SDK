var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Webhook = require("./../../../lib/paymaya/api/Webhook");

describe('Webhook', function() {

	var webhook;
	var webhookId;
	
	var webhookOptions = {
		name: "CHECKOUT_SUCCESS",
		callbackUrl: "http://shop.someserver.com/success",
		callbackUrlUpdate: "http://shop.someserver.com/success_update",
		webhookId: "123",
	};

	before(function(done) {
		paymayaSdk.initCheckout("pk-iaioBC2pbY6d3BVRSebsJxghSHeJDW4n6navI7tYdrN", "sk-uh4ZFfx9i0rZpKN6CxJ826nVgJ4saGGVAH9Hk7WrY6Q", paymayaSdk.ENVIRONMENT.SANDBOX);

		webhook = new Webhook();
		webhook.name = webhookOptions.name;
		webhook.callbackUrl = webhookOptions.callbackUrl;
		webhook.webhookId = webhookOptions.webhookId;
		done();
	});
	
	it('should have name property', function(done) {
		webhook.should.have.property('name');
		done();
	});

	it('should have callbackUrl property', function(done) {
		webhook.should.have.property('callbackUrl');
		done();
	});

	it('should have webhookId property', function(done) {
		webhook.should.have.property('webhookId');
		done();
	});

	it('should return correct name value', function(done) {
		webhook.name.should.equal(webhookOptions.name);
		done();
	});

	it('should return correct callbackUrl value', function(done) {
		webhook.callbackUrl.should.equal(webhookOptions.callbackUrl);
		done();
	});

	it('should return correct webhookId value', function(done) {
		webhook.webhookId.should.equal(webhookOptions.webhookId);
		done();
	});

	it('should execute register webhook successfully', function(done) {
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			done();
		}
		webhook.register(callback);
	});

	it('should execute retrieve webhook successfully', function(done) {
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			webhookId = response[0].id;
  			done();
		}
		webhook.retrieve(callback);
	});

	it('should execute update webhook successfully', function(done) {
		webhook.webhookId = webhookId;
		webhook.name = webhookOptions.name;
		webhook.callbackUrl = webhookOptions.callbackUrlUpdate;
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			done();
		}
		webhook.update(callback);
	});

	it('should execute delete webhook successfully', function(done) {
		webhook.webhookId = webhookId;
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			done();
		}
		webhook.delete(callback);
	});
});
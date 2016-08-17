var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Webhook = require("./../../../lib/paymaya/api/Webhook");

describe('Webhook', function() {

	var webhook;
	
	var webhookOptions = {
		name: "CHECKOUT_SUCCESS",
		callbackUrl: "http://shop.someserver.com/success",
		callbackUrlUpdate: "http://shop.someserver.com/success_update"
	};

	before(function(done) {
		paymayaSdk.initCheckout("pk-8rOz4MQKRxd5OLKBPcR6FIUx4Kay71kB3UrBFDaH172", "sk-VrEDVetYZ6f4R1w4g0npwLzeBXtksd1smJ5lqk9Yh4y", paymayaSdk.ENVIRONMENT.SANDBOX);

		webhook = new Webhook();
		webhook.name = webhookOptions.name;
		webhook.callbackUrl = webhookOptions.callbackUrl;
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

	it('should have id property', function(done) {
		webhook.should.have.property('id');
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
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			done();
		}
		webhook.delete(callback);
	});
});

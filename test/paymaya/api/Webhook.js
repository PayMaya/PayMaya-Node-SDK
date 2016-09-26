var keys = require("./../../keys.json");
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
		paymayaSdk.initCheckout(keys.publicKey, keys.secretKey, paymayaSdk.ENVIRONMENT.SANDBOX);

		//delete all webhooks that are already registered
		webhook = new Webhook();
		webhook.retrieve(function(err, result) {
			if(result.length === 0) {
				done();
			}

			var finished = 0;

			function webhookDeleted() {
				if(++finished === result.length) done();
			}

			result.forEach(function(webhookObj) {
				var registeredWebhook = new Webhook();
				registeredWebhook.id = webhookObj.id;
				registeredWebhook.delete(function(err) {
					webhookDeleted();
				});
			});
		});
	});

	beforeEach(function() {
		webhook = new Webhook();
	});

	it('should execute register webhook successfully', function(done) {
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			done();
		}
		webhook.name = webhookOptions.name;
		webhook.callbackUrl = webhookOptions.callbackUrl;
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
		webhook.retrieve(function(err, result) {
			webhook.id = result[0].id;
			webhook.name = webhookOptions.name;
			webhook.callbackUrl = webhookOptions.callbackUrlUpdate;
			webhook.update(function(err, response) {
				should.not.exist(err);
	  			should.exist(response);
	  			done();
			});
		});
	});

	it('should execute delete webhook successfully', function(done) {
		webhook.retrieve(function(err, result) {
			webhook.id = result[0].id;
			webhook.delete(function(err, response) {
				should.not.exist(err);
	  			should.exist(response);
	  			done();
			});
		});
	});
});

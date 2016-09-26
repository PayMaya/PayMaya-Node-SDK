var keys = require("./../../keys.json");
var chai = require('chai');
var should = chai.should();

var paymayaSdk = require("./../../../lib/paymaya/PaymayaSDK");
var Customization = require("./../../../lib/paymaya/api/Customization");

describe('Customization', function() {

	var customization;

	var customizationOptions = {
		logoUrl: "https://cdn.paymaya.com/production/checkout_api/customization_example/yourlogo.svg",
		iconUrl: "https://cdn.paymaya.com/production/checkout_api/customization_example/youricon.ico",
		appleTouchIconUrl: "https://cdn.paymaya.com/production/checkout_api/customization_example/youricon_ios.ico",
		customTitle: "Checkout Page Title",
		colorScheme: "#368d5c"
	};

	before(function(done) {
		paymayaSdk.initCheckout(keys.publicKey, keys.secretKey, paymayaSdk.ENVIRONMENT.SANDBOX);

		customization = new Customization();
		customization.logoUrl = customizationOptions.logoUrl;
		customization.iconUrl = customizationOptions.iconUrl;
		customization.appleTouchIconUrl = customizationOptions.appleTouchIconUrl;
		customization.customTitle = customizationOptions.customTitle;
		customization.colorScheme = customizationOptions.colorScheme;
		done();
	});

	it('should have logoUrl property', function(done) {
		customization.should.have.property('logoUrl');
		done();
	});

	it('should have iconUrl property', function(done) {
		customization.should.have.property('iconUrl');
		done();
	});

	it('should have appleTouchIconUrl property', function(done) {
		customization.should.have.property('appleTouchIconUrl');
		done();
	});

	it('should have customTitle property', function(done) {
		customization.should.have.property('customTitle');
		done();
	});

	it('should have colorScheme property', function(done) {
		customization.should.have.property('colorScheme');
		done();
	});

	it('should return correct logoUrl value', function(done) {
		customization.logoUrl.should.equal(customizationOptions.logoUrl);
		done();
	});

	it('should return correct iconUrl value', function(done) {
		customization.iconUrl.should.equal(customizationOptions.iconUrl);
		done();
	});

	it('should return correct appleTouchIconUrl value', function(done) {
		customization.appleTouchIconUrl.should.equal(customizationOptions.appleTouchIconUrl);
		done();
	});

	it('should return correct customTitle value', function(done) {
		customization.customTitle.should.equal(customizationOptions.customTitle);
		done();
	});

	it('should return correct logocolorSchemeUrl value', function(done) {
		customization.colorScheme.should.equal(customizationOptions.colorScheme);
		done();
	});

	it('should execute set customization successfully', function(done) {
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			response.should.have.property('logoUrl');
  			response.should.have.property('iconUrl');
  			response.should.have.property('appleTouchIconUrl');
  			response.should.have.property('customTitle');
  			response.should.have.property('colorScheme');
  			done();
		}
		customization.set(callback);
	});

	it('should execute get customization successfully', function(done) {
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			response.should.have.property('logoUrl');
  			response.should.have.property('iconUrl');
  			response.should.have.property('appleTouchIconUrl');
  			response.should.have.property('customTitle');
  			response.should.have.property('colorScheme');
  			done();
		}
		customization.get(callback);
	});

	it('should execute remove customization successfully', function(done) {
		var callback = function(err, response) {
			should.not.exist(err);
  			should.exist(response);
  			response.should.have.property('message');
  			done();
		}
		customization.remove(callback);
	});
});

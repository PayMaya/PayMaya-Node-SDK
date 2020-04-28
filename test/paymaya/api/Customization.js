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

	before(function() {
		paymayaSdk.initCheckout(keys.publicKey, keys.secretKey, paymayaSdk.ENVIRONMENT.SANDBOX);
	});

	context("when using callbacks", function() {
		before(function() {
			customization = new Customization();
			customization.logoUrl = customizationOptions.logoUrl;
			customization.iconUrl = customizationOptions.iconUrl;
			customization.appleTouchIconUrl = customizationOptions.appleTouchIconUrl;
			customization.customTitle = customizationOptions.customTitle;
			customization.colorScheme = customizationOptions.colorScheme;
		});

		it('should execute set customization successfully', function(done) {
			var callback = function(err, result) {
				should.not.exist(err);
				result.should.exist;
				result.logoUrl.should.equal(customizationOptions.logoUrl);
				result.iconUrl.should.equal(customizationOptions.iconUrl);
				result.appleTouchIconUrl.should.equal(customizationOptions.appleTouchIconUrl);
				result.customTitle.should.equal(customizationOptions.customTitle);
				result.colorScheme.should.equal(customizationOptions.colorScheme);
				done();
			}
			customization.set(callback);
		});

		it('should execute get customization successfully', function(done) {
			var callback = function(err, result) {
				should.not.exist(err);
				result.should.exist;
				result.logoUrl.should.equal(customizationOptions.logoUrl);
				result.iconUrl.should.equal(customizationOptions.iconUrl);
				result.appleTouchIconUrl.should.equal(customizationOptions.appleTouchIconUrl);
				result.customTitle.should.equal(customizationOptions.customTitle);
				result.colorScheme.should.equal(customizationOptions.colorScheme);
				done();
			}
			customization.get(callback);
		});

		it('should execute remove customization successfully', function(done) {
			var callback = function(err, result) {
				should.not.exist(err);
				result.should.exist;
				result.should.have.property('message');
				done();
			}
			customization.remove(callback);
		});
	});

	context("when using promises", function() {
		before(function() {
			customization = new Customization();
			customization.logoUrl = customizationOptions.logoUrl;
			customization.iconUrl = customizationOptions.iconUrl;
			customization.appleTouchIconUrl = customizationOptions.appleTouchIconUrl;
			customization.customTitle = customizationOptions.customTitle;
			customization.colorScheme = customizationOptions.colorScheme;
		});

		it("should execute set customization successfully", function(done) {
			customization.set().then(function(result) {
				result.should.exist;
				result.logoUrl.should.equal(customizationOptions.logoUrl);
				result.iconUrl.should.equal(customizationOptions.iconUrl);
				result.appleTouchIconUrl.should.equal(customizationOptions.appleTouchIconUrl);
				result.customTitle.should.equal(customizationOptions.customTitle);
				result.colorScheme.should.equal(customizationOptions.colorScheme);
			}).then(done);
		});

		it("should execute get customization successfully", function(done) {
			customization.get().then(function(result) {
				result.should.exist;
				result.logoUrl.should.equal(customizationOptions.logoUrl);
				result.iconUrl.should.equal(customizationOptions.iconUrl);
				result.appleTouchIconUrl.should.equal(customizationOptions.appleTouchIconUrl);
				result.customTitle.should.equal(customizationOptions.customTitle);
				result.colorScheme.should.equal(customizationOptions.colorScheme);
			}).then(done);
		});

		it("should execute remove customization successfully", function(done) {
			customization.remove().then(function(result) {
				result.should.exist;
				result.should.have.property("message");
			}).then(done);
		});
	});
});

var paymayaSdk = require("./../../lib/paymaya/PaymayaSDK");
var Customization = require("./../../lib/paymaya/api/Customization");

(function() {
	
	// Initialize Paymaya SDK with Checkout API key, secret key and environment(SANDBOX or PRODUCTION) to use shop customization
	paymayaSdk.initCheckout("pk-8rOz4MQKRxd5OLKBPcR6FIUx4Kay71kB3UrBFDaH172", "sk-VrEDVetYZ6f4R1w4g0npwLzeBXtksd1smJ5lqk9Yh4y", paymayaSdk.ENVIRONMENT.SANDBOX);

	// Initialize Customization
	var customization = new Customization();
	_executeSetCustomization(customization);
})();

function _executeSetCustomization(customization) {
	customization.logoUrl = "https://cdn.paymaya.com/production/checkout_api/customization_example/yourlogo.svg";
	customization.iconUrl = "https://cdn.paymaya.com/production/checkout_api/customization_example/youricon.ico";
	customization.appleTouchIconUrl = "https://cdn.paymaya.com/production/checkout_api/customization_example/youricon_ios.ico";
	customization.customTitle = "Checkout Page Title";
	customization.colorScheme = "#368d5c";

	var onSetCustomization = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}

		_executeGetCustomization(customization);
	}

	console.log("\nSet Customization Api");
	customization.set(onSetCustomization);
}

function _executeGetCustomization(customization) {
	var onGetCustomization = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}

		_executeRemoveCustomization(customization);
	}
	console.log("\nGet Customization Api");
	customization.get(onGetCustomization);
}

function _executeRemoveCustomization(customization) {
	var onRemoveCustomization = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}
	}
	console.log("\nRemove Customization Api");
	customization.remove(onRemoveCustomization);
}

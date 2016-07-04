var paymayaSdk = require("./../../lib/paymaya/PaymayaSDK");
var Customization = require("./../../lib/paymaya/api/Customization");

(function() {
	
	// Initialize Paymaya SDK with Checkout API key, secret key and environment(SANDBOX or PRODUCTION)
	paymayaSdk.initCheckout("pk-iaioBC2pbY6d3BVRSebsJxghSHeJDW4n6navI7tYdrN", "sk-uh4ZFfx9i0rZpKN6CxJ826nVgJ4saGGVAH9Hk7WrY6Q", paymayaSdk.ENVIRONMENT.SANDBOX);

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
			console.log("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}

		_executeGetCustomization(customization);
	}

	console.log("\nSet Customization Api");
	customization.execute(onSetCustomization);
}

function _executeGetCustomization(customization) {
	var onGetCustomization = function(err, response) {
		if(err) {
			console.log("Error: " + err);
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
			console.log("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}
	}
	console.log("\nRemove Customization Api");
	customization.remove(onRemoveCustomization);
}
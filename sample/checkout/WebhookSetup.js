var paymayaSdk = require("./../../lib/paymaya/PaymayaSDK");
var Webhook = require("./../../lib/paymaya/api/Webhook");

(function() {
	
	// Initialize Paymaya SDK with Checkout API key, secret key and environment(SANDBOX or PRODUCTION) to use webhook
	paymayaSdk.initCheckout("pk-8rOz4MQKRxd5OLKBPcR6FIUx4Kay71kB3UrBFDaH172", "sk-VrEDVetYZ6f4R1w4g0npwLzeBXtksd1smJ5lqk9Yh4y", paymayaSdk.ENVIRONMENT.SANDBOX);

	// Initialize Customization
	var webhook = new Webhook();
	_executeRegisterWebhook(webhook);
})();

function _executeRegisterWebhook(webhook) {
	webhook.name = "CHECKOUT_SUCCESS";
	webhook.callbackUrl = "http://shop.someserver.com/success";

	var onRegisterWebhook = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			//return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}

		_executeRetrieveWebhooks(webhook);
	}
	console.log("\nRegister Webhook Api");
	webhook.register(onRegisterWebhook);
}

function _executeRetrieveWebhooks(webhook) {
	var onRetrieveWebhook = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}
		_executeUpdateWebhook(webhook);
	}
	console.log("\nRetrieve Webhook Api");
	webhook.retrieve(onRetrieveWebhook);
}

function _executeUpdateWebhook(webhook) {
	webhook.callbackUrl = "http://shop.someserver.com/success_update";

	var onUpdateWebhook = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			//return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}

		_executeDeleteWebhook(webhook);
	}
	console.log("\nUpdate Webhook Api");
	webhook.update(onUpdateWebhook);
}

function _executeDeleteWebhook(webhook) {
	var onDeleteWebhook = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}
	}
	console.log("\nDelete Webhook Api");
	webhook.delete(onDeleteWebhook);
}

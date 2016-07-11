var paymayaSdk = require("./../../lib/paymaya/PaymayaSDK");
var Webhook = require("./../../lib/paymaya/api/Webhook");

(function() {
	
	// Initialize Paymaya SDK with Checkout API key, secret key and environment(SANDBOX or PRODUCTION)
	paymayaSdk.initCheckout("pk-iaioBC2pbY6d3BVRSebsJxghSHeJDW4n6navI7tYdrN", "sk-uh4ZFfx9i0rZpKN6CxJ826nVgJ4saGGVAH9Hk7WrY6Q", paymayaSdk.ENVIRONMENT.SANDBOX);

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
		_executeUpdateWebhook(webhook, response[0].id);
	}
	console.log("\nRetrieve Webhook Api");
	webhook.retrieve(onRetrieveWebhook);
}

function _executeUpdateWebhook(webhook, webhookId) {
	webhook.webhookId = webhookId;
	webhook.name = "CHECKOUT_SUCCESS";
	webhook.callbackUrl = "http://shop.someserver.com/success_update";

	var onUpdateWebhook = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			//return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}

		_executeDeleteWebhook(webhook, webhookId);
	}
	console.log("\nUpdate Webhook Api");
	webhook.update(onUpdateWebhook);
}

function _executeDeleteWebhook(webhook, webhookId) {
	webhook.webhookId = webhookId;
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
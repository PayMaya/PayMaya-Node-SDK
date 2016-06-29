module.exports = Webhook;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Webhook() {
	this._apiManager = APIManager;
};

Webhook.prototype = {

	/* PUBLIC FUNCTIONS */
	executeRegisterWebhook: function(options, callback) {
		options = options || {};
		var name = options.name || "";
		var callbackUrl = options.callbackUrl || "";

		var webhookData = {
			name: name,
			callbackUrl: callbackUrl
		}
		this._apiManager.executeRegisterWebhook(webhookData, callback);
	},

	executeRetrieveWebhooks: function(callback) {
		this._apiManager.executeRetrieveWebhooks(callback);
	},

	executeUpdateWebhook: function(webhookId, options, callback) {
		this._apiManager.executeUpdateWebhook(webhookId, options, callback);
	},

	executeRemoveWebhooks: function(webhookId, callback) {
		this._apiManager.executeRemoveWebhook(webhookId, callback);
	},
};
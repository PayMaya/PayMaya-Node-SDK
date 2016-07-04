module.exports = Webhook;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Webhook() {
	this._apiManager = APIManager;
	this.name = "";
	this.callbackUrl = "";
	this.webhookId = "";
};

Webhook.prototype = {

	/* PUBLIC FUNCTIONS */
	register: function(callback) {
		if(!this.name) {
			callback("Missing name");
			return;
		}

		if(!this.callbackUrl) {
			callback("Missing callbackUrl");
			return;
		}

		var webhookData = {
			name: this.name,
			callbackUrl: this.callbackUrl
		}
		this._apiManager.executeRegisterWebhook(webhookData, callback);
	},

	get: function(callback) {
		this._apiManager.executeRetrieveWebhooks(callback);
	},

	update: function(callback) {
		if(!this.webhookId) {
			callback("Missing webhookId");
			return;
		}

		if(!this.name) {
			callback("Missing name");
			return;
		}

		if(!this.callbackUrl) {
			callback("Missing callbackUrl");
			return;
		}

		var webhookData = {
			name: this.name,
			callbackUrl: this.callbackUrl
		}

		this._apiManager.executeUpdateWebhook(this.webhookId, webhookData, callback);
	},

	remove: function(callback) {
		this._apiManager.executeRemoveWebhook(this.webhookId, callback);
	},
};
module.exports = Webhook;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Webhook() {
	this._apiManager = APIManager;
	this.name = "";
	this.callbackUrl = "";
	this.id = "";
}

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

		var self = this;
		this._apiManager.executeRegisterWebhook(webhookData, function(err, response) {
			if(response) {
				self.id = response.id;
			}
			callback(err, response);
		});
	},

	retrieve: function(callback) {
		this._apiManager.executeRetrieveWebhooks(callback);
	},

	update: function(callback) {
		if(!this.id) {
			callback("Missing id");
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

		var self = this;
		this._apiManager.executeUpdateWebhook(this.id, webhookData, function(err, response) {
			if(response) {
				self.id = response.id;
				self.name = response.name;
				self.callbackUrl = response.callbackUrl;
			}
			callback(err, response);
		});
	},

	delete: function(callback) {
		if(!this.id) {
			callback("Missing id");
			return;
		}
		this._apiManager.executeRemoveWebhook(this.id, function(err, response) {
			if(response) {
				self.id = "";
				self.name = "";
				self.callbackUrl = "";
			}
			callback(err, response);
		});
	}
};
module.exports = Webhook;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");
var Promise = require("bluebird");

function Webhook() {
	this._apiManager = new APIManager();
	this.name = "";
	this.callbackUrl = "";
	this.id = "";
}

Webhook.prototype = {
	/* PUBLIC METHODS */
	register: function(callback) {
		if(callback) {
			return this._register(callback);
		}
		return new Promise(this._getCallback("_register"));
	},

	retrieve: function(callback) {
		if(callback) {
			return this._retrieve(callback);
		}
		return new Promise(this._getCallback("_retrieve"));
	},

	update: function(callback) {
		if(callback) {
			return this._update(callback);
		}
		return new Promise(this._getCallback("_update"));
	},

	delete: function(callback) {
		if(callback) {
			return this._delete(callback);
		}
		return new Promise(this._getCallback("_delete"));
	},

	/* PRIVATE METHODS */
	_getCallback: function(method) {
		var self = this;
		return function(resolve, reject) {
			self[method](function(err, result) {
				if(err) {
					return reject(err);
				}
				resolve(result);
			});
		};
	},

	_register: function(callback) {
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

	_retrieve: function(callback) {
		this._apiManager.executeRetrieveWebhooks(callback);
	},

	_update: function(callback) {
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

	_delete: function(callback) {
		if(!this.id) {
			callback("Missing id");
			return;
		}
		var self = this;
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

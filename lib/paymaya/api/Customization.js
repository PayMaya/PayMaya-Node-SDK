module.exports = Customization;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");
var PaymayaApiError = require("./../core/PaymayaApiError");
var Promise = require("bluebird");

function Customization() {
	this._apiManager = new APIManager();
	this.logoUrl = "";
	this.iconUrl = "";
	this.appleTouchIconUrl = "";
	this.customTitle = "";
	this.colorScheme = "";
}

Customization.prototype = {
	/* PUBLIC METHODS */
	set: function(callback) {
		if(callback) {
			return this._set(callback);
		}
		return new Promise(this._getCallback("_set"));
	},

	get: function(callback) {
		if(callback) {
			return this._get(callback);
		}
		return new Promise(this._getCallback("_get"));
	},

	remove: function(callback) {
		if(callback) {
			return this._remove(callback);
		}
		return new Promise(this._getCallback("_remove"));
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
		}
	},

	_set: function(callback) {
		if(!this.logoUrl) {
			return callback(new PaymayaApiError(null, {message: "Missing logoUrl"}));
		}

		if(!this.iconUrl) {
			return callback(new PaymayaApiError(null, {message: "Missing iconUrl"}));
		}

		if(!this.appleTouchIconUrl) {
			return callback(new PaymayaApiError(null, {message: "Missing appleTouchIconUrl"}));
		}

		if(!this.customTitle) {
			return callback(new PaymayaApiError(null, {message: "Missing customTitle"}));
		}

		if(!this.colorScheme) {
			return callback(new  PaymayaApiError(null, {message: "Missing colorScheme"}));
		}

		var customizationData = {
			logoUrl: this.logoUrl,
			iconUrl: this.iconUrl,
			appleTouchIconUrl: this.appleTouchIconUrl,
			customTitle: this.customTitle,
			colorScheme: this.colorScheme
		}
		this._apiManager.executeSetCustomization(customizationData, callback);
	},

	_get: function(callback) {
		var self = this;
		this._apiManager.executeGetCustomization(function(err, response) {
			if(response) {
				self.logoUrl = response.logoUrl;
				self.iconUrl = response.iconUrl;
				self.appleTouchIconUrl = response.appleTouchIconUrl;
				self.customTitle = response.customTitle;
				self.colorScheme = response.appcolorSchemeleTouchIconUrl;
			}
			callback(err, response);
		});
	},

	_remove: function(callback) {
		var self = this;
		this._apiManager.executeRemoveCustomization(function(err, response) {
			if(response) {
				self.logoUrl = "";
				self.iconUrl = "";
				self.appleTouchIconUrl = "";
				self.customTitle = "";
				self.colorScheme = "";
			}
			callback(err, response);
		});
	}
};

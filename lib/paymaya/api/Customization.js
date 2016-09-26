module.exports = Customization;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");
var PaymayaApiError = require("./../core/PaymayaApiError");

function Customization() {
	this._apiManager = new APIManager();
	this.logoUrl = "";
	this.iconUrl = "";
	this.appleTouchIconUrl = "";
	this.customTitle = "";
	this.colorScheme = "";
}

Customization.prototype = {

	/* PUBLIC FUNCTIONS */
	set: function(callback) {
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

	get: function(callback) {
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

	remove: function(callback) {
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

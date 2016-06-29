module.exports = Customization;

var APIManager = require("./../core/APIManager");
var paymayaSdk = require("./../PaymayaSDK");

function Customization() {
	this._apiManager = APIManager;
};

Customization.prototype = {

	/* PUBLIC FUNCTIONS */
	executeSetCustomization: function(options, callback) {
		options = options || {};
		var logoUrl = options.logoUrl || "";
		var iconUrl = options.iconUrl || "";
		var appleTouchIconUrl = options.appleTouchIconUrl || "";
		var customTitle = options.customTitle || "";
		var colorScheme = options.colorScheme || "";

		var customizationData = {
			logoUrl: logoUrl,
			iconUrl: iconUrl,
			appleTouchIconUrl: appleTouchIconUrl,
			customTitle: customTitle,
			colorScheme: colorScheme
		}
		this._apiManager.executeSetCustomization(customizationData, callback);
	},

	executeGetCustomization: function(callback) {
		this._apiManager.executeGetCustomization(callback);
	},

	executeRemoveCustomization: function(callback) {
		this._apiManager.executeRemoveCustomization(callback);
	}
};
module.exports = HttpConfig;

function HttpConfig(options) {
	options = options || {};

	this._METHOD = {
		HTTP_GET: "GET",
		HTTP_POST: "POST",
		HTTP_PUT: "PUT",
		HTTP_DELETE: "DELETE"
	};

	this._url = options.url || "";
	this._method = options.method || this._METHOD.HTTP_POST;
	this._headers = options.headers || [];
	this._maximumRequestAttempt = options.maximumRequestAttempt || 5;
};

HttpConfig.prototype = {

	/* PUBLIC FUNCTIONS */
	setUrl: function(url) {
		this._url = url;
	},

	getUrl: function() {
		return this._url;
	},

	setMethod: function(method) {
		this._method = method;
	},

	getMethod: function() {
		return this._method;
	},

	setMaximumRequestAttempt: function(maximumRequestAttempt) {
		this._maximumRequestAttempt = maximumRequestAttempt;
	},

	getMaximumRequestAttempt: function() {
		return this._maximumRequestAttempt;
	},

	setHeaders: function(headers) {
		this._headers = headers;
	},

	getHeaders: function() {
		return this._headers;
	},

	addHeader: function(header) {
		this._headers.push(header);	
	},

	addHeaders: function(headers) {
		for(var i=0; i<headers.length; i++) {
			this._headers.push(headers[i]);
		}
	}
};
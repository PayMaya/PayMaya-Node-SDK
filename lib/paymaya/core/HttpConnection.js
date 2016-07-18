module.exports = HttpConnection;

var request = require('requestretry');
var HttpConfig = require("./HttpConfig");
var PaymayaApiError = require("./PaymayaApiError");

function HttpConnection(httpConfig) {
	this._httpConfig = httpConfig;
}

HttpConnection.prototype = {

	/* PUBLIC FUNCTIONS */
	execute: function(data, callback) {
		var httpOptions = {
		  url: this._httpConfig.getUrl(),
		  method: this._httpConfig.getMethod(),
		  headers: this._httpConfig.getHeaders(),
		  maxAttempts: this._httpConfig.getMaximumRequestAttempt()
		};

		if(data) {
		  httpOptions['body'] = JSON.stringify(data);
		}

		request(httpOptions, function(err, response, body) {
		  if(err) {
		    return callback(err);
		  }

		  if(!body && response.statusCode >= 400) {
		    var paymayaApiError = new PaymayaApiError(response.statusCode);
		    return callback(paymayaApiError.message);
		  }

		  if(typeof body !== 'object') {
		    body = JSON.parse(body);
		  }

		  if(body.error) {
		    var paymayaApiError = new PaymayaApiError(response.statusCode, body.error);
		    return callback(paymayaApiError.message);
		  }

		  if(body.message && response.statusCode !== 200) {
		  	return callback(body.message);
		  }

		  callback(null, body);
		});
	}
};
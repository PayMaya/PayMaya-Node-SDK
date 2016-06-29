module.exports = PaymayaApiError;

var statusMessageFor5xx = {
	500: "Internal Server Error",
	501: "Not Implemented",
	502: "Bad Gateway",
	503: "Service Unavailable",
	505: "HTTP Version Not Supported"
}

function PaymayaApiError(httpStatusCode, errObj) {
	this.httpStatusCode = httpStatusCode;
	this.name = 'PaymayaApiError';
	if(errObj) {
		this.code = errObj.code;
		this.message = errObj.message;
		if(errObj.parameters) this.parameters = errObj.parameters;
		if(errObj.details) this.details = errObj.details;
	} else {
		this.message = statusMessageFor5xx[httpStatusCode];
	}
}
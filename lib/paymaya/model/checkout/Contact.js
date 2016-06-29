module.exports = Contact;

function Contact(options) {
	options = options || {};

	this.phone = options.phone || "";
	this.email = options.email || "";

	/*
	Object.defineProperty(this, "phone", {
		get: function() { return this.phone }
	});

	Object.defineProperty(this, "email", {
		get: function() { return this.email }
	});
	*/
}

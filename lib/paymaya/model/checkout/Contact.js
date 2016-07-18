module.exports = Contact;

function Contact(options) {
	options = options || {};

	this.phone = options.phone || "";
	this.email = options.email || "";
}

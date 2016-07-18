module.exports = User;

var Address = require("./../../lib/paymaya/model/checkout/Address");
var Buyer = require("./../../lib/paymaya/model/checkout/Buyer");
var Contact = require("./../../lib/paymaya/model/checkout/Contact");

function User() {

  this._firstName = "John";
  this._middleName = "Michaels";
  this._lastName = "Doe";

  // Contact
  this._contact = new Contact();
  this._contact.phone = "+63(2)1234567890";
  this._contact.email = "paymayabuyer1@gmail.com";

  // Address
  var address = new Address();
  address.line1 = "9F Robinsons Cybergate 3";
  address.line2 = "Pioneer Street";
  address.city = "Mandaluyong City";
  address.state = "Metro Manila";
  address.zipCode = "12345";
  address.countryCode = "PH";
  this._shippingAddress = address;
  this._billingAddress = address;
}

User.prototype = {

	getBuyer: function() {
		var buyer = new Buyer();
    buyer.firstName = this._firstName;
    buyer.middleName = this._middleName;
    buyer.lastName = this._lastName;
    buyer.contact = this._contact;
    buyer.shippingAddress = this._shippingAddress;
    buyer.billingAddress = this._billingAddress;
		return buyer;
	}
};
module.exports = User;

var Address = require("./../../lib/paymaya/model/checkout/Address");
var Buyer = require("./../../lib/paymaya/model/checkout/Buyer");
var Contact = require("./../../lib/paymaya/model/checkout/Contact");

function User() {

  this._firstName = "John";
  this._middleName = "Michaels";
  this._lastName = "Doe";

  // Contact
  var contactOptions = {
  	phone : "+63(2)1234567890",
  	email : "paymayabuyer1@gmail.com"
  };
  this._contact = new Contact(contactOptions);

  // Address
  var addressOptions = {
  	line1 : "9F Robinsons Cybergate 3",
  	line2 : "Pioneer Street",
  	city : "Mandaluyong City",
  	state : "Metro Manila",
  	zipCode : "12345",
  	countryCode : "PH"
  };
  var address = new Address(addressOptions);
  this._shippingAddress = address;
  this._billingAddress = address;
};

User.prototype = {

	getBuyer: function() {
		var buyerOptions = {
			firstName : this._firstName,
			middleName : this._middleName,
			lastName : this._lastName,
			contact : this._contact,
			shippingAddress : this._shippingAddress,
			billingAddress : this._billingAddress
		};
		var buyer = new Buyer(buyerOptions);
		return buyer;
	}
};
var paymayaSdk = require("./../../lib/paymaya/PaymayaSDK");
var Checkout = require("./../../lib/paymaya/api/Checkout");
var Item = require("./../../lib/paymaya/model/checkout/Item");
var ItemAmount = require("./../../lib/paymaya/model/checkout/ItemAmount");
var ItemAmountDetails = require("./../../lib/paymaya/model/checkout/ItemAmountDetails");
var User = require("./User");

(function() {
	
	// Initialize Paymaya SDK with Checkout API key, secret key and environment(SANDBOX or PRODUCTION)
	paymayaSdk.initCheckout("pk-iaioBC2pbY6d3BVRSebsJxghSHeJDW4n6navI7tYdrN", "sk-uh4ZFfx9i0rZpKN6CxJ826nVgJ4saGGVAH9Hk7WrY6Q", paymayaSdk.ENVIRONMENT.SANDBOX);

	// Contruct item amount details
	var itemAmountDetails = _getItemAmountDetails();

	// Construct item amount
	var itemAmount = _getItemAmount(itemAmountDetails);

	// Contruct item
	var item = _getItem(itemAmount, itemAmount);

	// Construct buyer object
	var user = new User();
	var buyer = user.getBuyer();

	// Contruct item list
	var items = [];
	items.push(item);

	// Initialize Checkout
	var checkout = new Checkout();
	_executeInitiateCheckout(checkout, buyer, items, itemAmount);

})();

function _getItemAmountDetails() {
	var itemAmountDetailsOptions = {
		shippingFee: "14.00",
		tax: "5.00",
		subTotal: "50.00" 
	}
	return new ItemAmountDetails(itemAmountDetailsOptions);
}

function _getItemAmount(itemAmountDetails) {
	var itemAmountOptions = {
		currency: "PHP",
		value: "69.00",
		details: itemAmountDetails
	}
	return new ItemAmount(itemAmountOptions);
}

function _getItem(amount, totalAmount) {
	var itemOptions = {
		name: "Leather Belt",
		code: "pm_belt",
		description: "Medium-sv",
		amount: amount,
		totalAmount: totalAmount
	}
	return new Item(itemOptions);
}

function _executeInitiateCheckout(checkout, buyer, items, itemAmount) {
	checkout.buyer = buyer;
	checkout.items = items;
	checkout.totalAmount = itemAmount;
	checkout.requestReferenceNumber = "123456789";
	var onInitiateCheckout = function(err, response) {
		if(err) {
			console.log("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}

		_executeGetCheckout(checkout, response.checkoutId);
	}
	console.log("\nInitiating Checkout Api");
	checkout.execute(onInitiateCheckout);
}

function _executeGetCheckout(checkout, checkoutId) {
	checkout.checkoutId = checkoutId;
	var onRetrieveCheckout = function(err, response) {
		if(err) {
			console.log("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}
	}
	console.log("\nRetrieving Checkout Api");
	checkout.get(onRetrieveCheckout);
}

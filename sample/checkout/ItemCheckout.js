var paymayaSdk = require("./../../lib/paymaya/PaymayaSDK");
var Checkout = require("./../../lib/paymaya/api/Checkout");
var Item = require("./../../lib/paymaya/model/checkout/Item");
var ItemAmount = require("./../../lib/paymaya/model/checkout/ItemAmount");
var ItemAmountDetails = require("./../../lib/paymaya/model/checkout/ItemAmountDetails");
var User = require("./User");

(function() {
	
	// Initialize Paymaya SDK with Checkout API key, secret key and environment(SANDBOX or PRODUCTION)
	paymayaSdk.initCheckout("pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah", "sk-uh4ZFfx9i0rZpKN6CxJ826nVgJ4saGGVAH9Hk7WrY6Q", paymayaSdk.ENVIRONMENT.SANDBOX);

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
	var itemAmountDetails = new ItemAmountDetails();
	itemAmountDetails.shippingFee = "14.00";
	itemAmountDetails.tax = "5.00";
	itemAmountDetails.subTotal = "50.00";
	return itemAmountDetails;
}

function _getItemAmount(itemAmountDetails) {
	var itemAmount = new ItemAmount();
	itemAmount.currency = "PHP";
	itemAmount.value = "69.00";
	itemAmount.details = itemAmountDetails;
	return itemAmount;
}

function _getItem(amount, totalAmount) {
	var item = new Item();
	item.name = "Leather Belt";
	item.code = "pm_belt";
	item.description = "Medium-sv";
	item.amount = amount;
	item.totalAmount = totalAmount;
	return item;
}

function _executeInitiateCheckout(checkout, buyer, items, itemAmount) {
	checkout.buyer = buyer;
	checkout.items = items;
	checkout.totalAmount = itemAmount;
	checkout.requestReferenceNumber = "123456789";
	var onInitiateCheckout = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}

  	checkout.getStatus(console.log);
		_executeGetCheckout(checkout);
	}
	console.log("\nInitiating Checkout Api");
	checkout.execute(onInitiateCheckout);
}

function _executeGetCheckout(checkout) {
	var onRetrieveCheckout = function(err, response) {
		if(err) {
			console.error("Error: " + err);
			return;
		}
		if(response) {
			console.log(JSON.stringify(response));
		}
	}
	console.log("\nRetrieving Checkout Api");
	checkout.retrieve(onRetrieveCheckout);
}

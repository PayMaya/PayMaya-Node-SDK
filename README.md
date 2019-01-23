# PayMaya-Node-SDK

The PayMaya Node SDK allows your Node.JS app to accept payments from your customers using any MasterCard and Visa enabled card (credit, debit, or prepaid).

[![Code Climate](https://codeclimate.com/github/PayMaya/PayMaya-Node-SDK/badges/gpa.svg)](https://codeclimate.com/github/PayMaya/PayMaya-Node-SDK)

## Dependencies

* [requestretry](https://github.com/FGRibreau/node-request-retry)


#### Tests:
* [chai](https://github.com/chaijs/chai)
* [mocha](https://github.com/mochajs/mocha)


## Installation

```sh
npm install paymaya-node-sdk
```

## Prerequisites

#### _API Keys_
To use your PayMaya Node SDK, you need to have a different API key for Sandbox and Production environment.
 
##### _Sandbox Environment_
 
Sandbox credentials are useful for testing application integration. All transactions and money flow made in this environment are only simulated and does not reflect your production records. The following sandbox API key can be used for testing purposes:

 ```
Public-facing API Key: pk-TnpIh5X432Qw1DJLlMhzxRhBN4fvUp3SHPuHT3m5wv6

Secret API Key: sk-SNCvnXbvtAxU6mszPMoDl2M1d4e1ivko1E6PLGiOiqm
```
 
##### _Production Environment_
 
Upon successful integration testing, you can then request for production credentials. Upon receipt, just change your SDK initialization to use production environment to start accepting live transactions.

## Usage

Public functions in Checkout, Payments, Customization and Webhook instances are executed asynchronously so you have to pass callback with two parameters for error and actual response. This is an example of callback:
```javascript
var callback = function(err, response) {
   if(err) {
      console.log(err);
      return;
   }
   console.log(JSON.stringify(response));
}
```

#### _Checkout_

##### 1. Initiate SDK
```javascript
var sdk = require("paymaya-node-sdk");
var PaymayaSDK = sdk.PaymayaSDK;

PaymayaSDK.initCheckout(
    <CHECKOUT_PUBLIC_FACING_API_KEY>,
    <CHECKOUT_SECRET_API_KEY>,
    PaymayaSDK.ENVIRONMENT.SANDBOX
);
```
_If in Production, change environment to PaymayasDK.ENVIRONMENT.PRODUCTION_

##### 2. Create Checkout object
```javascript
var Checkout = sdk.Checkout;
var checkout = new Checkout();
```

##### 3. Execute Checkout API
* Initiate Checkout - Checkout service entry point. It returns a `checkoutId`, and `redirectUrl`. Use the `redirectUrl` to redirect the buyer to the Checkout page.
```javascript
var YOUR_REQUEST_REFERENCE_NUMBER = "123456789";

var Checkout = sdk.Checkout;
var Contact = sdk.Contact;
var Address = sdk.Address;
var Buyer = sdk.Buyer;
var ItemAmountDetails = sdk.ItemAmountDetails;
var ItemAmount = sdk.ItemAmount;
var Item = sdk.Item;

var addressOptions = {
  	line1 : "9F Robinsons Cybergate 3",
  	line2 : "Pioneer Street",
  	city : "Mandaluyong City",
  	state : "Metro Manila",
  	zipCode : "12345",
  	countryCode : "PH"
};

var contactOptions = {
 	phone : "+63(2)1234567890",
 	email : "paymayabuyer1@gmail.com"
};

var buyerOptions = {
	firstName : "John",
	middleName : "Michaels",
	lastName : "Doe"
};
	
var contact = new Contact();
contact.phone = contactOptions.phone;
contact.email = contactOptions.email;
buyerOptions.contact = contact;

var address = new Address();
address.line1 = addressOptions.line1;
address.line2 = addressOptions.line2;
address.city = addressOptions.city;
address.state = addressOptions.state;
address.zipCode = addressOptions.zipCode;
address.countryCode = addressOptions.countryCode;
buyerOptions.shippingAddress = address;
buyerOptions.billingAddress = address;
	  	
/**
* Construct buyer here
*/
var buyer = new Buyer();
buyer.firstName = buyerOptions.firstName;
buyer.middleName = buyerOptions.middleName;
buyer.lastName = buyerOptions.lastName;
buyer.contact = buyerOptions.contact;
buyer.shippingAddress = buyerOptions.shippingAddress;
buyer.billingAddress = buyerOptions.billingAddress;


var itemAmountDetailsOptions = {
	shippingFee: "14.00",
	tax: "5.00",
	subTotal: "50.00" 
};

var itemAmountOptions = {
	currency: "PHP",
	value: "69.00"
};

var itemOptions = {
	name: "Leather Belt",
	code: "pm_belt",
	description: "Medium-sv"
};

var itemAmountDetails = new ItemAmountDetails();
itemAmountDetails.shippingFee = itemAmountDetailsOptions.shippingFee;
itemAmountDetails.tax = itemAmountDetailsOptions.tax;
itemAmountDetails.subTotal = itemAmountDetailsOptions.subTotal;
itemAmountOptions.details = itemAmountDetails;

var itemAmount = new ItemAmount();
itemAmount.currency = itemAmountOptions.currency;
itemAmount.value = itemAmountOptions.value;
itemAmount.details = itemAmountOptions.details;
itemOptions.amount = itemAmount;
itemOptions.totalAmount = itemAmount;

/**
* Contruct item here
*/
var item = new Item();
item.name = itemOptions.name;
item.code = itemOptions.code;
item.description = itemOptions.description;
item.amount = itemOptions.amount;
item.totalAmount = itemOptions.totalAmount;

// Add all items here
var items = [];
items.push(item);

checkout.buyer = buyer;
checkout.totalAmount = itemOptions.totalAmount;
checkout.requestReferenceNumber = YOUR_REQUEST_REFERENCE_NUMBER;
checkout.items = items;

checkout.execute(function (error, response) {
    if (error) {
        // handle error
    } else {
        // track response.checkoutId
        // redirect to response.redirectUrl
    }
});
```

* Retrieve Checkout - Use this call to get information about a checkout identified by a checkoutId.
```javascript
checkout.retrieve(callback);
```

#### _Customization_

##### 1. Initiate SDK
```javascript
var PaymayaSDK = require("paymaya-node-sdk").PaymayaSDK;

PaymayaSDK.initCheckout(<CHECKOUT_PUBLIC_FACING_API_KEY>, <CHECKOUT_SECRET_API_KEY>, PaymayaSDK.ENVIRONMENT.SANDBOX);
```
_If in Production, change environment to PaymayaSDK.ENVIRONMENT.PRODUCTION_

##### 2. Create Customization object
```javascript
var Customization = require("paymaya-node-sdk").Customization;
var customization = new Customization();
```

##### 3. Execute Customization API
* Set Customization - Used to set a merchant's checkout page customization.
```javascript
customization.logoUrl = "https://cdn.paymaya.com/production/checkout_api/customization_example/yourlogo.svg";
customization.iconUrl = "https://cdn.paymaya.com/production/checkout_api/customization_example/youricon.ico";
customization.appleTouchIconUrl = "https://cdn.paymaya.com/production/checkout_api/customization_example/youricon_ios.ico";
customization.customTitle = "Checkout Page Title";
customization.colorScheme = "#368d5c";

customization.set(callback);
```

* Get Customization - Used to get a merchant's set checkout page customization.
```javascript
customization.get(callback);
```

* Remove Customization - Used to remove a merchant's set checkout page customization.
```javascript
customization.remove(callback);
```
#### _Webhook_

##### 1. Initiate SDK
```javascript
var PaymayaSDK = require("paymaya-node-sdk").PaymayaSDK;

PaymayaSDK.initCheckout(<CHECKOUT_PUBLIC_FACING_API_KEY>, <CHECKOUT_SECRET_API_KEY>, PaymayaSDK.ENVIRONMENT.SANDBOX);
```
_If in Production, change environment to PaymayaSDK.ENVIRONMENT.PRODUCTION_

##### 2. Create Webhook object
```javascript
var Webhook = require("paymaya-node-sdk").Webhook;
var webhook = new Webhook();
```

##### 3. Execute Webhook API
* Set Webhook - Used to register an event-based webhook.
```javascript
webhook.name = "CHECKOUT_SUCCESS"; // it can be CHECKOUT_SUCCESS or CHECKOUT_FAILURE
webhook.callbackUrl = "http://shop.someserver.com/success";

webhook.register(callback);
```

* Get Webhook - Used to retrieve the list of merchant registered webhooks.
```javascript
webhook.retrieve(callback);
```

* Update Webhook - Used to update an existing event-based webhook.
```javascript
webhook.name = "CHECKOUT_SUCCESS"; // it can be CHECKOUT_SUCCESS or CHECKOUT_FAILURE
webhook.callbackUrl = "http://shop.someserver.com/success_update";

webhook.update(callback);
```

* Remove Webhook - Used to delete an existing webhook. You cannot undo this action.
```javascript
webhook.delete(callback);
```

## Summary
* These docs in the SDK include an overview of usage, step-by-step integration instructions, and sample code.
* A sample app is included in the sample folder in the project.
* [Checkout API Documentation](https://developers.paymaya.com/blog/entry/paymaya-checkout-api-overview) and [Payments API Documentation](https://developers.paymaya.com/docs/e/payments) are currently available which cover error codes and server-side integration instructions.

## Contribution
   * If you would like to contribute, please fork the repo and send in a pull request.

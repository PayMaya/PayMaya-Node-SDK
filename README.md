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
Public-facing API Key: pk-iaioBC2pbY6d3BVRSebsJxghSHeJDW4n6navI7tYdrN

Secret API Key: sk-uh4ZFfx9i0rZpKN6CxJ826nVgJ4saGGVAH9Hk7WrY6Q
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
var paymayaSdk = require("paymaya-node-sdk");

paymayaSdk.initCheckout(<CHECKOUT_PUBLIC_FACING_API_KEY>, <CHECKOUT_SECRET_KEY>, paymayaSdk.ENVIRONMENT.SANDBOX);
```
_If in Production, change environment to paymayaSdk.ENVIRONMENT.PRODUCTION_

##### 2. Create Checkout object
```javascript
var checkout = new Checkout();
```

##### 3. Execute Checkout API
* Initiate Checkout - Checkout service entry point. It returns a checkoutId, and checkoutUrl. Use the checkoutUrl to redirect the buyer to the Checkout page.
```javascript
/**
* Construct buyer here
* var buyer = new Buyer();
*
* Contruct item here
* var item = new Item();
*
* Contruct total amount here
* var totalAmount = new TotalAmount();
* 
*/

// Add all items here
var items = [];
items.push(item);

checkout.buyer = buyer;
checkout.totalAmount = totalAmount;
checkout.requestReferenceNumber = YOUR_REQUEST_REFERENCE_NUMBER;
checkout.items = items;

checkout.execute(callback);
```

* Retrieve Checkout - Use this call to get information about a checkout identified by a checkoutId.
```javascript
checkout.retrieve(callback);
```

#### _Payments_

#### _Customization_

##### 1. Initiate SDK
```javascript
var paymayaSdk = require("paymaya-node-sdk");

paymayaSdk.initCheckout(<CHECKOUT_PUBLIC_FACING_API_KEY>, <CHECKOUT_SECRET_KEY>, paymayaSdk.ENVIRONMENT.SANDBOX);
```

##### 2. Create Customization object
```javascript
var customization = new Customization();
```

##### 3. Execute Customization API
* Set Customization - Used to set a merchant's checkout page customization.
```javascript
customization.logoUrl = "";
customization.iconUrl = "";
customization.appleTouchIconUrl = "";
customization.customTitle = "";
customization.colorScheme = "";

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
var paymayaSdk = require("paymaya-node-sdk");

paymayaSdk.initCheckout(<CHECKOUT_PUBLIC_FACING_API_KEY>, <CHECKOUT_SECRET_KEY>, paymayaSdk.ENVIRONMENT.SANDBOX);
```

##### 2. Create Webhook object
```javascript
var webhook = new Webhook();
```

##### 3. Execute Webhook API
* Set Webhook - Used to register an event-based webhook.
```javascript
webhook.name = "CHECKOUT_SUCCESS"; // it can be CHECKOUT_SUCCESS or CHECKOUT_FAILURE
webhook.callbackUrl = "";

webhook.register(callback);
```

* Get Webhook - Used to retrieve the list of merchant registered webhooks.
```javascript
webhook.get(callback);
```

* Update Webhook - Used to update an existing event-based webhook.
```javascript
webhook.name = "CHECKOUT_SUCCESS"; // it can be CHECKOUT_SUCCESS or CHECKOUT_SUCCESS
webhook.callbackUrl = "";

webhook.update(callback);
```

* Remove Webhook - Used to delete an existing webhook. You cannot undo this action.
```javascript
webhook.remove(callback);
```

## Summary
* These docs in the SDK include an overview of usage, step-by-step integration instructions, and sample code.
* A sample app is included in the sample folder in the project.
* [Checkout API Documentation](https://developers.paymaya.com/blog/entry/paymaya-checkout-api-overview) and [Payments API Documentation](https://developers.paymaya.com/docs/e/payments) are currently available which cover error codes and server-side integration instructions.

## Contribution
   * If you would like to contribute, please fork the repo and send in a pull request.

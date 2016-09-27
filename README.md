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
Public-facing API Key: pk-3xHUatfWGUo99aJyvs6HO8DI7844WhIaUq3ZjYO0JMz

Secret API Key: sk-cV7iWN4htmUZHEZwV28wQo94JHwiiU5a67RLj0jjq4T
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

paymayaSdk.initCheckout(<CHECKOUT_PUBLIC_FACING_API_KEY>, <CHECKOUT_SECRET_API_KEY>, paymayaSdk.ENVIRONMENT.SANDBOX);
```
_If in Production, change environment to paymayaSdk.ENVIRONMENT.PRODUCTION_

##### 2. Create Checkout object
```javascript
var checkout = new Checkout();
```

##### 3. Execute Checkout API
* Initiate Checkout - Checkout service entry point. It returns a checkoutId, and checkoutUrl. Use the checkoutUrl to redirect the buyer to the Checkout page.

```javascript
var YOUR_REQUEST_REFERENCE_NUMBER = "123456789";

var address = {
  line1 : "9F Robinsons Cybergate 3",
  line2 : "Pioneer Street",
  city : "Mandaluyong City",
  state : "Metro Manila",
  zipCode : "12345",
  countryCode : "PH"
};

var buyer = {
  firstName : "John",
  middleName : "Michaels",
  lastName : "Doe",
  contact: {
    phone : "+63(2)1234567890",
    email : "paymayabuyer1@gmail.com"
  },
  billingAddress: address,
  shippingAddress: address
};

var amountDetails = {
  shippingFee: "14.00",
  tax: "5.00",
  subTotal: "50.00"
};

var amount = {
  currency: "PHP",
  value: "69.00",
  details: amountDetails
};

var item = {
  name: "Leather Belt",
  code: "pm_belt",
  description: "Medium-sv",
  quantity: "1",
  details: amountDetails,
  amount: amount,
  totalAmount: amount
};

var items = [item];

var redirectUrl = {
 "success": "http://shop.someserver.com/success?id=6319921",
  "failure": "http://shop.someserver.com/failure?id=6319921",
  "cancel": "http://shop.someserver.com/cancel?id=6319921"
};

checkout.buyer = buyer;
checkout.totalAmount = itemOptions.totalAmount;
checkout.requestReferenceNumber = YOUR_REQUEST_REFERENCE_NUMBER;
checkout.items = items;

checkout.execute(callback);
```

Information about the buyer, items inside the cart, and total amount are needed to create a new checkout. Refer to the tables below for more information.

##### Checkout object

| Properties             | type                 | required? |
|------------------------|----------------------|-----------|
| buyer                  | buyer object         | yes       |
| totalAmount            | amount object        | yes       |
| items                  | list of item objects | yes       |
| requestReferenceNumber | string               | yes       |
| redirectUrl            | redirect URL object  | no        |

##### Buyer object

| Properties      | type           | required? |
|-----------------|----------------|-----------|
| firstName       | string         | yes       |
| middleName      | string         | no        |
| lastName        | string         | yes       |
| contact         | contact object | no        |
| billingAddress  | address object | yes       |
| shippingAddress | address object | no        |

##### Contact object

| Properties | type   | required? |
|------------|--------|-----------|
| phone      | string | no        |
| email      | string | no        |

##### Address object

| Properties  | type   | required? |
|-------------|--------|-----------|
| line1       | string | yes       |
| line2       | string | no        |
| city        | string | yes       |
| state       | string | yes       |
| zipCode     | string | yes       |
| countryCode | string | yes       |


##### Total Amount object

| Properties | type                  | required? |
|------------|-----------------------|-----------|
| value      | string                | yes       |
| currency   | string                | no        |
| details    | amount details object | yes       |

##### Amount Details object

| Properties    | type   | required? |
|---------------|--------|-----------|
| subtotal      | string | yes       |
| tax           | string | no        |
| shippingFee   | string | no        |
| serviceCharge | string | no        |
| discount      | string | no        |

##### Item object

| Properties  | type          | required? |
|-------------|---------------|-----------|
| name        | string        | yes       |
| code        | string        | no        |
| description | string        | no        |
| quantity    | string        | yes       |
| amount      | amount object | yes       |
| totalAmount | amount object | yes       |

##### redirect URL object

| Properties  | type          | required? |
|-------------|---------------|-----------|
| success     | string        | no        |
| failure     | string        | no        |
| cancel      | string        | no        |

Check https://developers.paymaya.com/blog/entry/paymaya-checkout-api-overview for more information.

* Retrieve Checkout - Use this call to get information about a checkout identified by a checkoutId.
```javascript
checkout.retrieve(callback);
```

#### _Customization_

##### 1. Initiate SDK
```javascript
var paymayaSdk = require("paymaya-node-sdk");

paymayaSdk.initCheckout(<CHECKOUT_PUBLIC_FACING_API_KEY>, <CHECKOUT_SECRET_API_KEY>, paymayaSdk.ENVIRONMENT.SANDBOX);
```
_If in Production, change environment to paymayaSdk.ENVIRONMENT.PRODUCTION_

##### 2. Create Customization object
```javascript
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
var paymayaSdk = require("paymaya-node-sdk");

paymayaSdk.initCheckout(<CHECKOUT_PUBLIC_FACING_API_KEY>, <CHECKOUT_SECRET_API_KEY>, paymayaSdk.ENVIRONMENT.SANDBOX);
```
_If in Production, change environment to paymayaSdk.ENVIRONMENT.PRODUCTION_

##### 2. Create Webhook object
```javascript
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

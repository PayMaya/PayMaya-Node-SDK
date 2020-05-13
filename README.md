# paymaya-node-sdk

The PayMaya Node SDK allows your Node.JS app to accept payments from your customers using any MasterCard and Visa enabled card (credit, debit, or prepaid).

[![npm](https://img.shields.io/npm/v/paymaya-node-sdk?color=8dc540&style=for-the-badge)](https://www.npmjs.com/package/paymaya-node-sdk)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/PayMaya/PayMaya-Node-SDK/CI?color=8dc540&style=for-the-badge)](https://github.com/PayMaya/PayMaya-Node-SDK/actions?query=workflow%3ACI)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/PayMaya/PayMaya-Node-SDK?color=8dc540&style=for-the-badge)](https://codeclimate.com/github/PayMaya/PayMaya-Node-SDK)
[![GitHub license](https://img.shields.io/github/license/PayMaya/PayMaya-Node-SDK?color=8dc540&style=for-the-badge)](https://github.com/PayMaya/PayMaya-Node-SDK/blob/master/LICENSE)

## Usage

### Install

```sh
# npm
npm i paymaya-node-sdk

# yarn
yarn add paymaya-node-sdk
```

## Quick Start

```js
import PayMayaSDK from 'paymaya-node-sdk';
// or using CommonJS
// const PayMayaSDK = require('paymaya-node-sdk);

const publicKey = 'pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah';
const secretKey = 'sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl';
const isSandbox = true;

const paymaya = new PayMayaSDK(publicKey, secretKey, isSandbox);

async function run() {
  const result = await paymaya.Checkout.get('73759488-a84e-481d-97e2-cc67b528b326');
  console.log(result);
}

run();
```

## Contributing

[**Guidelines**](https://github.com/PayMaya/PayMaya-Node-SDK/blob/master/CONTRIBUTING.md)

[**Code of Conduct**](https://github.com/PayMaya/PayMaya-Node-SDK/blob/master/CODE_OF_CONDUCT.md)

## License

[MIT](https://github.com/PayMaya/PayMaya-Node-SDK/blob/master/LICENSE)

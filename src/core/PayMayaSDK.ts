import CheckoutAPI from '../api/CheckoutAPI';
import CheckoutAPIContract from '../types/checkout/CheckoutAPI';
import PayMayaSDKContract from '../types/core/PayMayaSDK';
import PaymentGatewayAPI from './PaymentGatewayAPI';

class PayMayaSDK implements PayMayaSDKContract {
  public readonly Checkout: CheckoutAPIContract;

  /* istanbul ignore next  */
  constructor(publicKey: string, secretKey: string, isSandbox = true) {
    const pgAPI = new PaymentGatewayAPI(publicKey, secretKey, isSandbox);
    this.Checkout = new CheckoutAPI(pgAPI);
  }
}

export default PayMayaSDK;

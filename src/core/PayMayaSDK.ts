import CheckoutAPI from '../api/CheckoutAPI';
import PaymentAPI from '../api/PaymentAPI';
import CheckoutAPIContract from '../types/checkout/CheckoutAPI';
import PayMayaSDKContract from '../types/core/PayMayaSDK';
import PaymentAPIContract from '../types/payment/PaymentAPI';
import PaymentGatewayAPI from './PaymentGatewayAPI';

class PayMayaSDK implements PayMayaSDKContract {
  public readonly Checkout: CheckoutAPIContract;

  public readonly Payment: PaymentAPIContract;

  /* istanbul ignore next  */
  constructor(publicKey: string, secretKey: string, isSandbox = true) {
    const pgAPI = new PaymentGatewayAPI(publicKey, secretKey, isSandbox);
    this.Checkout = new CheckoutAPI(pgAPI);
    this.Payment = new PaymentAPI(pgAPI);
  }
}

export default PayMayaSDK;

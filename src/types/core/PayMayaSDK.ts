import CheckoutAPIContract from '../checkout/CheckoutAPI';
import PaymentAPIContract from '../payment/PaymentAPI';

interface PayMayaSDK {
  readonly Checkout: CheckoutAPIContract;
  readonly Payment: PaymentAPIContract;
}

export default PayMayaSDK;

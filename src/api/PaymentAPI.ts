import PaymentGatewayAPI from '../types/core/PaymentGatewayAPI';
import PaymentAPIContract from '../types/payment/PaymentAPI';
import WebhookAPIContract from '../types/payment/webhook/WebhookAPI';
import WebhookAPI from './WebhookAPI';

class PaymentAPI implements PaymentAPIContract {
  private api: PaymentGatewayAPI;

  public readonly Webhook: WebhookAPIContract;

  constructor(api: PaymentGatewayAPI) {
    this.api = api;
    this.Webhook = new WebhookAPI(this.api);
  }
}

export default PaymentAPI;

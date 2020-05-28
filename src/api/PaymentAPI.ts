import AuthKey from '../types/core/AuthKey';
import PaymentGatewayAPI from '../types/core/PaymentGatewayAPI';
import PGResponse from '../types/core/PGResponse';
import GetStatusResponse from '../types/payment/GetStatusResponse';
import Payment from '../types/payment/Payment';
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

  async get(paymentId: string): Promise<PGResponse<Payment>> {
    return this.api.get<Payment>(
      AuthKey.SECRET,
      `/checkout/v1/payments/${paymentId}`,
    );
  }

  async getStatus(paymentId: string): Promise<PGResponse<GetStatusResponse>> {
    return this.api.get<GetStatusResponse>(
      AuthKey.SECRET,
      `/checkout/v1/payments/${paymentId}/status`,
    );
  }
}

export default PaymentAPI;

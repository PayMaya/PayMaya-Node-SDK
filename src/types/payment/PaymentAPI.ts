import PGResponse from '../core/PGResponse';
import GetStatusResponse from './GetStatusResponse';
import WebhookAPI from './webhook/WebhookAPI';

interface PaymentAPI {
  Webhook: WebhookAPI;

  getStatus(paymentId: string): Promise<PGResponse<GetStatusResponse>>;
}

export default PaymentAPI;

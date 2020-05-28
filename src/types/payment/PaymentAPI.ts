import PGResponse from '../core/PGResponse';
import GetStatusResponse from './GetStatusResponse';
import Payment from './Payment';
import WebhookAPI from './webhook/WebhookAPI';

interface PaymentAPI {
  Webhook: WebhookAPI;

  get(paymentId: string): Promise<PGResponse<Payment>>;

  getStatus(paymentId: string): Promise<PGResponse<GetStatusResponse>>;

  captureAuthorizedPayment(paymentId: string): Promise<PGResponse<Payment>>;
}

export default PaymentAPI;

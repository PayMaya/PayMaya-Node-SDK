import PGResponse from '../core/PGResponse';
import Checkout from './Checkout';
import CreateParams from './CreateParams';
import CreateResponse from './CreateResponse';
import Refund from './Refund';
import RefundParams from './RefundParams';
import RefundResponse from './RefundResponse';
import VoidResponse from './VoidResponse';

interface CheckoutAPI {
  create(params: CreateParams): Promise<PGResponse<CreateResponse>>;

  get(checkoutId: string): Promise<PGResponse<Checkout>>;

  void(checkoutId: string, reason: string): Promise<PGResponse<VoidResponse>>;

  refund(params: RefundParams): Promise<PGResponse<RefundResponse>>;

  getRefund(checkoutId: string, refundId: string): Promise<PGResponse<Refund>>;

  getRefunds(checkoutId: string): Promise<PGResponse<Refund[]>>;
}

export default CheckoutAPI;

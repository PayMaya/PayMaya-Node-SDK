import Checkout from '../types/checkout/Checkout';
import CheckoutAPIContract from '../types/checkout/CheckoutAPI';
import CreateParams from '../types/checkout/CreateParams';
import CreateResponse from '../types/checkout/CreateResponse';
import Refund from '../types/checkout/Refund';
import RefundParams from '../types/checkout/RefundParams';
import RefundResponse from '../types/checkout/RefundResponse';
import VoidResponse from '../types/checkout/VoidResponse';
import AuthKey from '../types/core/AuthKey';
import PaymentGatewayAPI from '../types/core/PaymentGatewayAPI';
import PGResponse from '../types/core/PGResponse';

class CheckoutAPI implements CheckoutAPIContract {
  private api: PaymentGatewayAPI;

  constructor(api: PaymentGatewayAPI) {
    this.api = api;
  }

  async create(params: CreateParams): Promise<PGResponse<CreateResponse>> {
    return this.api.post<CreateResponse>(
      AuthKey.PUBLIC,
      '/checkout/v1/checkouts',
      params,
    );
  }

  async get(checkoutId: string): Promise<PGResponse<Checkout>> {
    return this.api.get<Checkout>(
      AuthKey.SECRET,
      `/checkout/v1/checkouts/${checkoutId}`,
    );
  }

  async void(checkoutId: string, reason: string): Promise<PGResponse<VoidResponse>> {
    return this.api.delete<VoidResponse>(
      AuthKey.SECRET,
      `/checkout/v1/checkouts/${checkoutId}`,
      { reason },
    );
  }

  async refund(params: RefundParams): Promise<PGResponse<RefundResponse>> {
    const {
      checkoutId,
      ...data
    } = params;

    return this.api.post<RefundResponse>(
      AuthKey.SECRET,
      `/checkout/v1/checkouts/${checkoutId}/refunds`,
      data,
    );
  }

  async getRefund(checkoutId: string, refundId: string): Promise<PGResponse<Refund>> {
    return this.api.get<Refund>(
      AuthKey.SECRET,
      `/checkout/v1/checkouts/${checkoutId}/refunds/${refundId}`,
    );
  }

  async getRefunds(checkoutId: string): Promise<PGResponse<Refund[]>> {
    return this.api.get<Refund[]>(
      AuthKey.SECRET,
      `/checkout/v1/checkouts/${checkoutId}/refunds`,
    );
  }
}

export default CheckoutAPI;

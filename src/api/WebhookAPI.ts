import AuthKey from '../types/core/AuthKey';
import PaymentGatewayAPI from '../types/core/PaymentGatewayAPI';
import PGResponse from '../types/core/PGResponse';
import CreateParams from '../types/payment/webhook/CreateParams';
import UpdateParams from '../types/payment/webhook/UpdateParams';
import Webhook from '../types/payment/webhook/Webhook';
import WebhookContract from '../types/payment/webhook/WebhookAPI';

class WebhookAPI implements WebhookContract {
  private api: PaymentGatewayAPI;

  constructor(api: PaymentGatewayAPI) {
    this.api = api;
  }

  async create(params: CreateParams): Promise<PGResponse<Webhook>> {
    return this.api.post<Webhook>(
      AuthKey.SECRET,
      '/payments/v1/webhooks',
      params,
    );
  }

  async get(webhookId: string): Promise<PGResponse<Webhook>> {
    return this.api.get<Webhook>(
      AuthKey.SECRET,
      `/payments/v1/webhooks/${webhookId}`,
    );
  }

  async getAll(): Promise<PGResponse<Webhook[]>> {
    return this.api.get<Webhook[]>(
      AuthKey.SECRET,
      '/payments/v1/webhooks',
    );
  }

  async update(params: UpdateParams): Promise<PGResponse<Webhook>> {
    const {
      id: webhookId,
      ...data
    } = params;

    return this.api.put<Webhook>(
      AuthKey.SECRET,
      `/payments/v1/webhooks/${webhookId}`,
      data,
    );
  }

  async delete(webhookId: string): Promise<PGResponse<Webhook>> {
    return this.api.delete<Webhook>(
      AuthKey.SECRET,
      `/payments/v1/webhooks/${webhookId}`,
    );
  }
}

export default WebhookAPI;

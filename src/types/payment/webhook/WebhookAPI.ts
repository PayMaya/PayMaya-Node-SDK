import PGResponse from '../../core/PGResponse';
import CreateParams from './CreateParams';
import UpdateParams from './UpdateParams';
import Webhook from './Webhook';

interface WebhookAPI {
  create(params: CreateParams): Promise<PGResponse<Webhook>>;

  get(webhookId: string): Promise<PGResponse<Webhook>>;

  getAll(): Promise<PGResponse<Webhook[]>>;

  update(params: UpdateParams): Promise<PGResponse<Webhook>>;

  delete(webhookId: string): Promise<PGResponse<Webhook>>;
}

export default WebhookAPI;

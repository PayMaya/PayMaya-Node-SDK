import CheckoutAPI from './CheckoutAPI.spec';
import WebhookAPI from './WebhookAPI.spec';

export default (): void => {
  describe('api', () => {
    CheckoutAPI();
    WebhookAPI();
  });
};

import PayMayaSDK from './PayMayaSDK.spec';
import PaymentGatewayAPI from './PaymentGatewayAPI.spec';

export default (): void => {
  describe('core', () => {
    PayMayaSDK();
    PaymentGatewayAPI();
  });
};

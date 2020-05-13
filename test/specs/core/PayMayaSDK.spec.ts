import { expect } from 'chai';
import sinon from 'sinon';
import CheckoutAPI from '../../../src/api/CheckoutAPI';
import PaymentAPI from '../../../src/api/PaymentAPI';
import PayMayaSDK from '../../../src/core/PayMayaSDK';
import PaymentGatewayAPI from '../../../src/core/PaymentGatewayAPI';

export default (): void => {
  describe('PayMayaSDK', () => {
    beforeEach(() => {
      sinon.stub(PaymentGatewayAPI);
      sinon.stub(CheckoutAPI);
      sinon.stub(PaymentAPI);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should be able to instantiate', () => {
      const sdk = new PayMayaSDK('publicKey', 'secretKey', true);
      expect(sdk).to.be.an.instanceOf(PayMayaSDK);
    });
  });
};

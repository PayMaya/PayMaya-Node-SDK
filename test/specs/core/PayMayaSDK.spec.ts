import { expect } from 'chai';
import sinon from 'sinon';
import CheckoutAPI from '../../../src/api/CheckoutAPI';
import PayMayaSDK from '../../../src/core/PayMayaSDK';
import PaymentGatewayAPI from '../../../src/core/PaymentGatewayAPI';

export default (): void => {
  describe('PayMayaSDK', () => {
    beforeEach(() => {
      sinon.stub(PaymentGatewayAPI);
      sinon.stub(CheckoutAPI);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should have a property returning an instance of CheckoutAPI', () => {
      const sdk = new PayMayaSDK('publicKey', 'secretKey', true);
      expect(sdk).to.haveOwnProperty('Checkout');
      expect(sdk.Checkout).to.be.an.instanceOf(CheckoutAPI);
    });
  });
};

import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CheckoutAPI from '../../../src/api/CheckoutAPI';
import AuthKey from '../../../src/types/core/AuthKey';

export default (): void => {
  describe('CheckoutAPI', () => {
    let pgAPIStub: {
      get: SinonStub;
      post: SinonStub;
      put: SinonStub;
      patch: SinonStub;
      delete: SinonStub;
    };

    let checkoutAPI: CheckoutAPI;

    beforeEach(() => {
      pgAPIStub = {
        get: sinon.stub(),
        post: sinon.stub(),
        put: sinon.stub(),
        patch: sinon.stub(),
        delete: sinon.stub(),
      };

      checkoutAPI = new CheckoutAPI(pgAPIStub);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should have a method create()', () => {
      expect(checkoutAPI.create).to.be.instanceOf(Function);
    });

    it('should have a method get()', () => {
      expect(checkoutAPI.get).to.be.instanceOf(Function);
    });

    it('should have a method void()', () => {
      expect(checkoutAPI.void).to.be.instanceOf(Function);
    });

    it('should have a method refund()', () => {
      expect(checkoutAPI.refund).to.be.instanceOf(Function);
    });

    it('should have a method getRefund()', () => {
      expect(checkoutAPI.getRefund).to.be.instanceOf(Function);
    });

    it('should have a method getRefunds()', () => {
      expect(checkoutAPI.getRefunds).to.be.instanceOf(Function);
    });

    describe('create()', () => {
      const params = {
        totalAmount: {
          value: 100,
          currency: 'PHP' as const,
          details: {
            discount: 0,
            serviceCharge: 0,
            shippingFee: 0,
            tax: 0,
            subtotal: 100,
          },
        },
        buyer: {
          firstName: 'John',
          middleName: 'Paul',
          lastName: 'Doe',
          birthday: '1995-10-24',
          customerSince: '1995-10-24',
          sex: 'M',
          contact: {
            phone: '+639181008888',
            email: 'merchant@merchantsite.com',
          },
          shippingAddress: {
            firstName: 'John',
            middleName: 'Paul',
            lastName: 'Doe',
            phone: '+639181008888',
            email: 'merchant@merchantsite.com',
            line1: '6F Launchpad',
            line2: 'Reliance Street',
            city: 'Mandaluyong City',
            state: 'Metro Manila',
            zipCode: '1552',
            countryCode: 'PH',
            shippingType: 'ST',
          },
          billingAddress: {
            line1: '6F Launchpad',
            line2: 'Reliance Street',
            city: 'Mandaluyong City',
            state: 'Metro Manila',
            zipCode: '1552',
            countryCode: 'PH',
          },
        },
        items: [
          {
            name: 'Canvas Slip Ons',
            quantity: 1,
            code: 'CVG-096732',
            description: 'Shoes',
            amount: {
              value: 100,
              details: {
                discount: 0,
                serviceCharge: 0,
                shippingFee: 0,
                tax: 0,
                subtotal: 100,
              },
            },
            totalAmount: {
              value: 100,
              details: {
                discount: 0,
                serviceCharge: 0,
                shippingFee: 0,
                tax: 0,
                subtotal: 100,
              },
            },
          },
        ],
        redirectUrl: {
          success: 'https://www.merchantsite.com/success',
          failure: 'https://www.merchantsite.com/failure',
          cancel: 'https://www.merchantsite.com/cancel',
        },
        requestReferenceNumber: '1551191039',
        metadata: {},
      };

      beforeEach(async () => {
        await checkoutAPI.create(params);
      });

      it('should do a POST request', () => {
        expect(pgAPIStub.post).to.have.been.calledOnce();
      });

      it('should use a PUBLIC key', () => {
        expect(pgAPIStub.post.getCall(0).args[0]).to.be.eql(AuthKey.PUBLIC);
      });

      it('should include the parameters in the request body', () => {
        const body = pgAPIStub.post.getCall(0).args[2];
        expect(body).to.be.deep.equal(params);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = '/checkout/v1/checkouts';
        expect(pgAPIStub.post.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('get()', () => {
      const fakeCheckoutId = '73759488-a84e-481d-97e2-cc67b528b326';

      beforeEach(async () => {
        await checkoutAPI.get(fakeCheckoutId);
      });

      it('should do a GET request', () => {
        expect(pgAPIStub.get).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.get.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should include checkoutId in the request', () => {
        const actualUrl = pgAPIStub.get.getCall(0).args[1] as string;
        expect(actualUrl.split('/').pop()).to.be.eql(fakeCheckoutId);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = `/checkout/v1/checkouts/${fakeCheckoutId}`;
        expect(pgAPIStub.get.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('void()', () => {
      const fakeCheckoutId = '73759488-a84e-481d-97e2-cc67b528b326';
      const fakeReason = 'fake reason';

      beforeEach(async () => {
        await checkoutAPI.void(fakeCheckoutId, fakeReason);
      });

      it('should do a DELETE request', () => {
        expect(pgAPIStub.delete).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.delete.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should include checkoutId in the request', () => {
        const actualUrl = pgAPIStub.delete.getCall(0).args[1] as string;
        expect(actualUrl.split('/').pop()).to.be.eql(fakeCheckoutId);
      });

      it('should include reason in the request body', () => {
        const body = pgAPIStub.delete.getCall(0).args[2];
        expect(body).to.haveOwnProperty('reason');
        expect(body.reason).to.be.eql(fakeReason);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = `/checkout/v1/checkouts/${fakeCheckoutId}`;
        expect(pgAPIStub.delete.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('refund()', () => {
      const fakeCheckoutId = '73759488-a84e-481d-97e2-cc67b528b326';
      const fakeReason = 'fake reason';
      const refundParams = {
        checkoutId: fakeCheckoutId,
        reason: fakeReason,
        amount: {
          value: 50,
          currency: 'PHP' as const,
        },
      };

      beforeEach(async () => {
        await checkoutAPI.refund(refundParams);
      });

      it('should do a POST request', () => {
        expect(pgAPIStub.post).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.post.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should include checkoutId in the request', () => {
        const actualUrl = pgAPIStub.post.getCall(0).args[1] as string;
        expect(actualUrl.includes(`/${fakeCheckoutId}/`)).to.be.eql(true);
      });

      it('should include reason in the request body', () => {
        const body = pgAPIStub.post.getCall(0).args[2];
        expect(body).to.haveOwnProperty('reason');
        expect(body.reason).to.be.eql(fakeReason);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = `/checkout/v1/checkouts/${fakeCheckoutId}/refunds`;
        expect(pgAPIStub.post.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('getRefund()', () => {
      const fakeCheckoutId = '73759488-a84e-481d-97e2-cc67b528b326';
      const fakeRefundId = 'd555812b-4f2e-4993-b6bc-bddfe763d406';

      beforeEach(async () => {
        await checkoutAPI.getRefund(fakeCheckoutId, fakeRefundId);
      });

      it('should do a GET request', () => {
        expect(pgAPIStub.get).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.get.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should include checkoutId in the request', () => {
        const actualUrl = pgAPIStub.get.getCall(0).args[1] as string;
        expect(actualUrl.includes(`/${fakeCheckoutId}/`)).to.be.eql(true);
      });

      it('should include refundId in the request', () => {
        const actualUrl = pgAPIStub.get.getCall(0).args[1] as string;
        expect(actualUrl.split('/').pop()).to.be.eql(fakeRefundId);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = `/checkout/v1/checkouts/${fakeCheckoutId}/refunds/${fakeRefundId}`;
        expect(pgAPIStub.get.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('getRefunds()', () => {
      const fakeCheckoutId = '73759488-a84e-481d-97e2-cc67b528b326';

      beforeEach(async () => {
        await checkoutAPI.getRefunds(fakeCheckoutId);
      });

      it('should do a GET request', () => {
        expect(pgAPIStub.get).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.get.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should include checkoutId in the request', () => {
        const actualUrl = pgAPIStub.get.getCall(0).args[1] as string;
        expect(actualUrl.includes(`/${fakeCheckoutId}/`)).to.be.eql(true);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = `/checkout/v1/checkouts/${fakeCheckoutId}/refunds`;
        expect(pgAPIStub.get.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });
  });
};

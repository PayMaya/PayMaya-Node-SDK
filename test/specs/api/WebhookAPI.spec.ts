import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import WebhookAPI from '../../../src/api/WebhookAPI';
import AuthKey from '../../../src/types/core/AuthKey';

export default (): void => {
  describe('PaymentAPI', () => {
    let pgAPIStub: {
      get: SinonStub;
      post: SinonStub;
      put: SinonStub;
      patch: SinonStub;
      delete: SinonStub;
    };

    let webhookAPI: WebhookAPI;

    beforeEach(() => {
      pgAPIStub = {
        get: sinon.stub(),
        post: sinon.stub(),
        put: sinon.stub(),
        patch: sinon.stub(),
        delete: sinon.stub(),
      };

      webhookAPI = new WebhookAPI(pgAPIStub);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should have a method create()', () => {
      expect(webhookAPI.create).to.be.instanceOf(Function);
    });

    it('should have a method get()', () => {
      expect(webhookAPI.get).to.be.instanceOf(Function);
    });

    it('should have a method getAll()', () => {
      expect(webhookAPI.getAll).to.be.instanceOf(Function);
    });

    it('should have a method update()', () => {
      expect(webhookAPI.update).to.be.instanceOf(Function);
    });

    it('should have a method delete()', () => {
      expect(webhookAPI.delete).to.be.instanceOf(Function);
    });

    describe('create()', () => {
      const params = {
        name: 'Foo',
        callbackUrl: 'https://localhost.com/hook',
      };

      beforeEach(async () => {
        await webhookAPI.create(params);
      });

      it('should do a POST request', () => {
        expect(pgAPIStub.post).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.post.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should include the parameters in the request body', () => {
        const body = pgAPIStub.post.getCall(0).args[2];

        expect(body).to.be.deep.equal(params);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = '/payments/v1/webhooks';

        expect(pgAPIStub.post.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('get()', () => {
      const fakeWebhookId = '300ddb5c-e939-4166-bbc5-8e951c84b03d';

      beforeEach(async () => {
        await webhookAPI.get(fakeWebhookId);
      });

      it('should do a GET request', () => {
        expect(pgAPIStub.get).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.get.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should include webhookId in the request', () => {
        const actualUrl = pgAPIStub.get.getCall(0).args[1] as string;
        expect(actualUrl.split('/').pop()).to.be.eql(fakeWebhookId);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = `/payments/v1/webhooks/${fakeWebhookId}`;

        expect(pgAPIStub.get.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('getAll()', () => {
      beforeEach(async () => {
        await webhookAPI.getAll();
      });

      it('should do a GET request', () => {
        expect(pgAPIStub.get).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.get.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = '/payments/v1/webhooks';

        expect(pgAPIStub.get.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('update()', () => {
      const params = {
        id: '300ddb5c-e939-4166-bbc5-8e951c84b03d',
        callbackUrl: 'https://localhost.com/new-hook',
      };

      beforeEach(async () => {
        await webhookAPI.update(params);
      });

      it('should do a PUT request', () => {
        expect(pgAPIStub.put).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.put.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should include the parameters in the request body', () => {
        const expectedBody = {
          callbackUrl: params.callbackUrl,
        };

        const body = pgAPIStub.put.getCall(0).args[2];

        expect(body).to.be.deep.equal(expectedBody);
      });

      it('should request the correct endpoint', () => {
        const webhookId = params.id;
        const expectedUrl = `/payments/v1/webhooks/${webhookId}`;

        expect(pgAPIStub.put.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });

    describe('delete()', () => {
      const fakeWebhookId = '300ddb5c-e939-4166-bbc5-8e951c84b03d';

      beforeEach(async () => {
        await webhookAPI.delete(fakeWebhookId);
      });

      it('should do a DELETE request', () => {
        expect(pgAPIStub.delete).to.have.been.calledOnce();
      });

      it('should use a SECRET key', () => {
        expect(pgAPIStub.delete.getCall(0).args[0]).to.be.eql(AuthKey.SECRET);
      });

      it('should request the correct endpoint', () => {
        const expectedUrl = `/payments/v1/webhooks/${fakeWebhookId}`;

        expect(pgAPIStub.delete.getCall(0).args[1]).to.be.eql(expectedUrl);
      });
    });
  });
};

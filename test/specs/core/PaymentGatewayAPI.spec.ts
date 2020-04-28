import { expect } from 'chai';
import sinon from 'sinon';
import PaymentGatewayAPI from '../../../src/core/PaymentGatewayAPI';
import AuthKey from '../../../src/types/core/AuthKey';
import HttpMethod from '../../../src/types/core/HttpMethod';
import * as base64EncodeModule from '../../../src/utils/base64Encode';

export default (): void => {
  describe('PaymentGatewayAPI', () => {
    const fakePublicKey = 'publickey';
    const fakeSecretKey = 'publickey';
    let pgAPI: PaymentGatewayAPI;

    beforeEach(() => {
      sinon.replace(base64EncodeModule, 'default', (str) => `==fakeBase64Of${str}`);
      pgAPI = new PaymentGatewayAPI(fakePublicKey, fakeSecretKey, true);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should have a property TIMEOUT', () => {
      expect(pgAPI).to.haveOwnProperty('TIMEOUT');
      expect(pgAPI.TIMEOUT).to.be.eql(60000);
    });

    it('should have a property API_URL_SANDBOX', () => {
      expect(pgAPI).to.haveOwnProperty('API_URL_SANDBOX');
      expect(pgAPI.API_URL_SANDBOX).to.be.eql('https://pg-sandbox.paymaya.com');
    });

    it('should have a property API_URL_PRODUCTION', () => {
      expect(pgAPI).to.haveOwnProperty('API_URL_PRODUCTION');
      expect(pgAPI.API_URL_PRODUCTION).to.be.eql('https://pg.paymaya.com');
    });

    it('should use the sandbox URL by default or if isSandbox parameter is true', () => {
      pgAPI = new PaymentGatewayAPI('publicKey', 'secretKey');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((pgAPI as any).api.defaults.baseURL).to.be.eql(pgAPI.API_URL_SANDBOX);

      pgAPI = new PaymentGatewayAPI('publicKey', 'secretKey', true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((pgAPI as any).api.defaults.baseURL).to.be.eql(pgAPI.API_URL_SANDBOX);
    });

    it('should use the production URL if isSandbox parameter is false', () => {
      pgAPI = new PaymentGatewayAPI('publicKey', 'secretKey', false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((pgAPI as any).api.defaults.baseURL).to.be.eql(pgAPI.API_URL_PRODUCTION);
    });

    describe('get()', () => {
      it('should issue a GET request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');

        pgAPI.get(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.GET);
      });

      it('should pass the config of the request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeConfig = {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        };

        pgAPI.get(AuthKey.PUBLIC, '/foo', fakeConfig);

        expect(requestStub.getCall(0).args[4]).to.be.deep.equal(fakeConfig);
      });
    });

    describe('post()', () => {
      it('should issue a POST request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');

        pgAPI.post(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.POST);
      });

      it('should pass the data of the POST request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeData = {
          foo: 'bar',
        };

        pgAPI.post(AuthKey.PUBLIC, '/foo', fakeData);

        expect(requestStub.getCall(0).args[3]).to.be.deep.equal(fakeData);
      });

      it('should pass the config of the request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeConfig = {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        };

        pgAPI.post(AuthKey.PUBLIC, '/foo', null, fakeConfig);

        expect(requestStub.getCall(0).args[4]).to.be.deep.equal(fakeConfig);
      });
    });

    describe('put()', () => {
      it('should issue a PUT request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');

        pgAPI.put(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.PUT);
      });

      it('should pass the data of the PUT request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeData = {
          foo: 'bar',
        };

        pgAPI.put(AuthKey.PUBLIC, '/foo', fakeData);

        expect(requestStub.getCall(0).args[3]).to.be.deep.equal(fakeData);
      });

      it('should pass the config of the request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeConfig = {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        };

        pgAPI.put(AuthKey.PUBLIC, '/foo', null, fakeConfig);

        expect(requestStub.getCall(0).args[4]).to.be.deep.equal(fakeConfig);
      });
    });

    describe('patch()', () => {
      it('should issue a PATCH request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');

        pgAPI.patch(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.PATCH);
      });

      it('should pass the data of the PATCH request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeData = {
          foo: 'bar',
        };

        pgAPI.patch(AuthKey.PUBLIC, '/foo', fakeData);

        expect(requestStub.getCall(0).args[3]).to.be.deep.equal(fakeData);
      });

      it('should pass the config of the request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeConfig = {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        };

        pgAPI.patch(AuthKey.PUBLIC, '/foo', null, fakeConfig);

        expect(requestStub.getCall(0).args[4]).to.be.deep.equal(fakeConfig);
      });
    });

    describe('delete()', () => {
      it('should issue a DELETE request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');

        pgAPI.delete(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.DELETE);
      });

      it('should pass the data of the DELETE request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeData = {
          foo: 'bar',
        };

        pgAPI.delete(AuthKey.PUBLIC, '/foo', fakeData);

        expect(requestStub.getCall(0).args[3]).to.be.deep.equal(fakeData);
      });

      it('should pass the config of the request', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const requestStub = sinon.stub(pgAPI as any, 'request');
        const fakeConfig = {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        };

        pgAPI.delete(AuthKey.PUBLIC, '/foo', null, fakeConfig);

        expect(requestStub.getCall(0).args[4]).to.be.deep.equal(fakeConfig);
      });
    });

    describe('private getAuthorizationHeader()', () => {
      context('when AuthKey is SECRET', () => {
        it('should return the base64 Authorization header of the secret key', () => {
          const actualHeader = (pgAPI as any).getAuthorizationHeader(AuthKey.SECRET);

          expect(`Basic ==fakeBase64Of${fakeSecretKey}`).to.be.eql(actualHeader);
        });
      });

      context('when AuthKey is PUBLIC', () => {
        it('should return the base64 Authorization header of the public key', () => {
          const actualHeader = (pgAPI as any).getAuthorizationHeader(AuthKey.PUBLIC);

          expect(`Basic ==fakeBase64Of${fakePublicKey}`).to.be.eql(actualHeader);
        });
      });
    });

    describe('private request()', () => {
      context('when using config parameter', () => {
        it('should have Authorization header', async () => {
          const getSpy = sinon.spy((pgAPI as any).api, 'get');

          await (pgAPI as any).request(AuthKey.PUBLIC, HttpMethod.GET, '/');

          expect(getSpy).to.have.been.calledOnce();
          expect(getSpy.getCall(0).args[1]).to.be.deep.equal({
            headers: {
              Authorization: `Basic ==fakeBase64Of${fakePublicKey}`,
            },
          });
        });

        it('should combine unique headers', async () => {
          const getSpy = sinon.spy((pgAPI as any).api, 'get');

          await (pgAPI as any).request(AuthKey.PUBLIC, HttpMethod.GET, '/', null, {
            headers: {
              'Content-Type': 'application/octet-stream',
            },
          });

          expect(getSpy).to.have.been.calledOnce();
          expect(getSpy.getCall(0).args[1]).to.be.deep.equal({
            headers: {
              Authorization: `Basic ==fakeBase64Of${fakePublicKey}`,
              'Content-Type': 'application/octet-stream',
            },
          });
        });

        it('should override duplicate headers', async () => {
          const getSpy = sinon.spy((pgAPI as any).api, 'get');

          await (pgAPI as any).request(AuthKey.PUBLIC, HttpMethod.GET, '/', null, {
            headers: {
              Authorization: 'Basic ==newAuthKey',
            },
          });

          expect(getSpy).to.have.been.calledOnce();
          expect(getSpy.getCall(0).args[1]).to.be.deep.equal({
            headers: {
              Authorization: 'Basic ==newAuthKey',
            },
          });
        });
      });

      it('should make a GET request if method is set to GET', async () => {
        const getSpy = sinon.spy((pgAPI as any).api, 'get');

        await (pgAPI as any).request(AuthKey.PUBLIC, HttpMethod.GET, '/');

        expect(getSpy).to.have.been.calledOnceWith('/');
      });

      it('should make a POST request if method is set to POST', async () => {
        const postSpy = sinon.spy((pgAPI as any).api, 'post');

        await (pgAPI as any).request(AuthKey.PUBLIC, HttpMethod.POST, '/');

        expect(postSpy).to.have.been.calledOnceWith('/');
      });

      it('should make a PUT request if method is set to PUT', async () => {
        const putSpy = sinon.spy((pgAPI as any).api, 'put');

        await (pgAPI as any).request(AuthKey.PUBLIC, HttpMethod.PUT, '/');

        expect(putSpy).to.have.been.calledOnceWith('/');
      });

      it('should make a PATCH request if method is set to PATCH', async () => {
        const patchSpy = sinon.spy((pgAPI as any).api, 'patch');

        await (pgAPI as any).request(AuthKey.PUBLIC, HttpMethod.PATCH, '/');

        expect(patchSpy).to.have.been.calledOnceWith('/');
      });

      it('should make a DELETE request if method is set to DELETE', async () => {
        const deleteSpy = sinon.spy((pgAPI as any).api, 'delete');

        await (pgAPI as any).request(AuthKey.PUBLIC, HttpMethod.DELETE, '/');

        expect(deleteSpy).to.have.been.calledOnceWith('/');
      });

      it('should throw if method is not supported', async () => {
        const getSpy = sinon.spy((pgAPI as any).api, 'get');
        const postSpy = sinon.spy((pgAPI as any).api, 'post');
        const putSpy = sinon.spy((pgAPI as any).api, 'put');
        const patchSpy = sinon.spy((pgAPI as any).api, 'patch');
        const deleteSpy = sinon.spy((pgAPI as any).api, 'delete');

        try {
          await (pgAPI as any).request(AuthKey.PUBLIC, 'UNKNOWNHTTPMETHOD', '/');
        } catch (err) {
          expect(err.message).to.be.eql('Unsupported HTTP method UNKNOWNHTTPMETHOD');
        }

        expect(getSpy).to.have.not.been.called();
        expect(postSpy).to.have.not.been.called();
        expect(putSpy).to.have.not.been.called();
        expect(patchSpy).to.have.not.been.called();
        expect(deleteSpy).to.have.not.been.called();
      });
    });
  });
};

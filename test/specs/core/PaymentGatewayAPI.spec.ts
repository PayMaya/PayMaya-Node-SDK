import { expect } from 'chai';
import sinon from 'sinon';
import PaymentGatewayAPI from '../../../src/core/PaymentGatewayAPI';
import AuthKey from '../../../src/types/core/AuthKey';
import HttpMethod from '../../../src/types/core/HttpMethod';
import * as base64EncodeModule from '../../../src/utils/base64Encode';
import toAny from '../../testUtils/toAny';

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
      expect(toAny(pgAPI).api.defaults.baseURL).to.be.eql(pgAPI.API_URL_SANDBOX);

      pgAPI = new PaymentGatewayAPI('publicKey', 'secretKey', true);
      expect(toAny(pgAPI).api.defaults.baseURL).to.be.eql(pgAPI.API_URL_SANDBOX);
    });

    it('should use the production URL if isSandbox parameter is false', () => {
      pgAPI = new PaymentGatewayAPI('publicKey', 'secretKey', false);
      expect(toAny(pgAPI).api.defaults.baseURL).to.be.eql(pgAPI.API_URL_PRODUCTION);
    });

    describe('get()', () => {
      it('should issue a GET request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');

        pgAPI.get(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.GET);
      });

      it('should pass the config of the request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
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
        const requestStub = sinon.stub(toAny(pgAPI), 'request');

        pgAPI.post(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.POST);
      });

      it('should pass the data of the POST request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
        const fakeData = {
          foo: 'bar',
        };

        pgAPI.post(AuthKey.PUBLIC, '/foo', fakeData);

        expect(requestStub.getCall(0).args[3]).to.be.deep.equal(fakeData);
      });

      it('should pass the config of the request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
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
        const requestStub = sinon.stub(toAny(pgAPI), 'request');

        pgAPI.put(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.PUT);
      });

      it('should pass the data of the PUT request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
        const fakeData = {
          foo: 'bar',
        };

        pgAPI.put(AuthKey.PUBLIC, '/foo', fakeData);

        expect(requestStub.getCall(0).args[3]).to.be.deep.equal(fakeData);
      });

      it('should pass the config of the request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
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
        const requestStub = sinon.stub(toAny(pgAPI), 'request');

        pgAPI.patch(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.PATCH);
      });

      it('should pass the data of the PATCH request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
        const fakeData = {
          foo: 'bar',
        };

        pgAPI.patch(AuthKey.PUBLIC, '/foo', fakeData);

        expect(requestStub.getCall(0).args[3]).to.be.deep.equal(fakeData);
      });

      it('should pass the config of the request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
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
        const requestStub = sinon.stub(toAny(pgAPI), 'request');

        pgAPI.delete(AuthKey.PUBLIC, '/foo');

        expect(requestStub.getCall(0).args[1]).to.be.eql(HttpMethod.DELETE);
      });

      it('should pass the data of the DELETE request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
        const fakeData = {
          foo: 'bar',
        };

        pgAPI.delete(AuthKey.PUBLIC, '/foo', fakeData);

        expect(requestStub.getCall(0).args[3]).to.be.deep.equal(fakeData);
      });

      it('should pass the config of the request', () => {
        const requestStub = sinon.stub(toAny(pgAPI), 'request');
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
          const actualHeader = toAny(pgAPI).getAuthorizationHeader(AuthKey.SECRET);

          expect(`Basic ==fakeBase64Of${fakeSecretKey}`).to.be.eql(actualHeader);
        });
      });

      context('when AuthKey is PUBLIC', () => {
        it('should return the base64 Authorization header of the public key', () => {
          const actualHeader = toAny(pgAPI).getAuthorizationHeader(AuthKey.PUBLIC);

          expect(`Basic ==fakeBase64Of${fakePublicKey}`).to.be.eql(actualHeader);
        });
      });
    });

    describe('private request()', () => {
      context('when using config parameter', () => {
        it('should have Authorization header', async () => {
          const getSpy = sinon.spy(toAny(pgAPI).api, 'get');

          await toAny(pgAPI).request(AuthKey.PUBLIC, HttpMethod.GET, '/');

          expect(getSpy).to.have.been.calledOnce();
          expect(getSpy.getCall(0).args[1]).to.be.deep.equal({
            headers: {
              Authorization: `Basic ==fakeBase64Of${fakePublicKey}`,
            },
          });
        });

        it('should combine unique headers', async () => {
          const getSpy = sinon.spy(toAny(pgAPI).api, 'get');

          await toAny(pgAPI).request(AuthKey.PUBLIC, HttpMethod.GET, '/', null, {
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
          const getSpy = sinon.spy(toAny(pgAPI).api, 'get');

          await toAny(pgAPI).request(AuthKey.PUBLIC, HttpMethod.GET, '/', null, {
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
        const getSpy = sinon.spy(toAny(pgAPI).api, 'get');

        await toAny(pgAPI).request(AuthKey.PUBLIC, HttpMethod.GET, '/');

        expect(getSpy).to.have.been.calledOnceWith('/');
      });

      it('should make a POST request if method is set to POST', async () => {
        const postSpy = sinon.spy(toAny(pgAPI).api, 'post');

        await toAny(pgAPI).request(AuthKey.PUBLIC, HttpMethod.POST, '/');

        expect(postSpy).to.have.been.calledOnceWith('/');
      });

      it('should make a PUT request if method is set to PUT', async () => {
        const putSpy = sinon.spy(toAny(pgAPI).api, 'put');

        await toAny(pgAPI).request(AuthKey.PUBLIC, HttpMethod.PUT, '/');

        expect(putSpy).to.have.been.calledOnceWith('/');
      });

      it('should make a PATCH request if method is set to PATCH', async () => {
        const patchSpy = sinon.spy(toAny(pgAPI).api, 'patch');

        await toAny(pgAPI).request(AuthKey.PUBLIC, HttpMethod.PATCH, '/');

        expect(patchSpy).to.have.been.calledOnceWith('/');
      });

      it('should make a DELETE request if method is set to DELETE', async () => {
        const deleteSpy = sinon.spy(toAny(pgAPI).api, 'delete');

        await toAny(pgAPI).request(AuthKey.PUBLIC, HttpMethod.DELETE, '/');

        expect(deleteSpy).to.have.been.calledOnceWith('/');
      });

      it('should throw if method is not supported', async () => {
        const getSpy = sinon.spy(toAny(pgAPI).api, 'get');
        const postSpy = sinon.spy(toAny(pgAPI).api, 'post');
        const putSpy = sinon.spy(toAny(pgAPI).api, 'put');
        const patchSpy = sinon.spy(toAny(pgAPI).api, 'patch');
        const deleteSpy = sinon.spy(toAny(pgAPI).api, 'delete');

        try {
          await toAny(pgAPI).request(AuthKey.PUBLIC, 'UNKNOWNHTTPMETHOD', '/');
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

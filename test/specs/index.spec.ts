import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import sinon from 'sinon';
import PayMayaSDK from '../../src/core/PayMayaSDK';
import module from '../../src/index';
import api from './api/index.spec';
import core from './core/index.spec';
import utils from './utils/index.spec';


describe('paymaya-node-sdk-v2', () => {
  let axiosMock: MockAdapter;

  before(() => {
    axiosMock = new MockAdapter(axios);
    axiosMock.onAny(/.*/).reply((config) => [200, config.data]);
  });

  after(() => {
    axiosMock.restore();
    sinon.restore(); // Ensure everything is restored
  });

  it('should export the SDK', () => {
    expect(module).to.be.eql(PayMayaSDK);
  });

  api();
  core();
  utils();
});

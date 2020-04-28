import axios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import AuthKey from '../types/core/AuthKey';
import HttpMethod from '../types/core/HttpMethod';
import PaymentGatewayAPIContract from '../types/core/PaymentGatewayAPI';
import PGResponse from '../types/core/PGResponse';
import base64 from '../utils/base64Encode';

class PaymentGatewayAPI implements PaymentGatewayAPIContract {
  readonly TIMEOUT = 60000; // In milliseconds

  readonly API_URL_SANDBOX = 'https://pg-sandbox.paymaya.com';

  readonly API_URL_PRODUCTION = 'https://pg.paymaya.com';

  private readonly api: AxiosInstance;

  private readonly publicKey: string;

  private readonly secretKey: string;

  constructor(publicKey: string, secretKey: string, isSandbox = true) {
    this.publicKey = publicKey;
    this.secretKey = secretKey;

    this.api = axios.create({
      baseURL: (isSandbox)
        ? this.API_URL_SANDBOX
        : this.API_URL_PRODUCTION,
      timeout: this.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(
    authKey: AuthKey,
    url: string,
    config?: object,
  ): Promise<PGResponse<T>> {
    return this.request<T>(authKey, HttpMethod.GET, url, null, config);
  }

  async post<T>(
    authKey: AuthKey,
    url: string,
    data?: object,
    config?: object,
  ): Promise<PGResponse<T>> {
    return this.request<T>(authKey, HttpMethod.POST, url, data, config);
  }

  async put<T>(
    authKey: AuthKey,
    url: string,
    data?: object,
    config?: object,
  ): Promise<PGResponse<T>> {
    return this.request<T>(authKey, HttpMethod.PUT, url, data, config);
  }

  async patch<T>(
    authKey: AuthKey,
    url: string,
    data?: object,
    config?: object,
  ): Promise<PGResponse<T>> {
    return this.request<T>(authKey, HttpMethod.PATCH, url, data, config);
  }

  async delete<T>(
    authKey: AuthKey,
    url: string,
    data?: object,
    config?: object,
  ): Promise<PGResponse<T>> {
    return this.request<T>(authKey, HttpMethod.DELETE, url, data, config);
  }

  private getAuthorizationHeader(authKey): string {
    const key = (authKey === AuthKey.SECRET)
      ? this.secretKey
      : this.publicKey;

    return `Basic ${base64(key)}`;
  }

  private async request<T>(
    authKey: AuthKey,
    method: HttpMethod,
    url: string,
    data: object = null,
    config: AxiosRequestConfig = {},
  ): Promise<PGResponse<T>> {
    const headers = {
      Authorization: this.getAuthorizationHeader(authKey),
      ...(config.headers ? config.headers : {}),
    };
    const combinedConfig = {
      ...config,
      headers,
    };

    let response: AxiosResponse<T>;

    switch (method) {
      case HttpMethod.GET:
        response = await this.api.get<T>(url, combinedConfig);
        break;
      case HttpMethod.POST:
        response = await this.api.post<T>(url, data, combinedConfig);
        break;
      case HttpMethod.PUT:
        response = await this.api.put<T>(url, data, combinedConfig);
        break;
      case HttpMethod.PATCH:
        response = await this.api.patch<T>(url, data, combinedConfig);
        break;
      case HttpMethod.DELETE:
        response = await this.api.delete<T>(url, data, combinedConfig);
        break;
      default:
        throw new Error(`Unsupported HTTP method ${method}`);
    }

    return {
      data: response.data,
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    } as PGResponse<T>;
  }
}

export default PaymentGatewayAPI;

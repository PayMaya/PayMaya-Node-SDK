import AuthKey from './AuthKey';
import PGResponse from './PGResponse';

interface PaymentGatewayAPI {
  get<T>(
    authKey: AuthKey,
    url: string,
    config?: object
  ): Promise<PGResponse<T>>;

  post<T>(
    authKey: AuthKey,
    url: string,
    data?: object,
    config?: object
  ): Promise<PGResponse<T>>;

  put<T>(
    authKey: AuthKey,
    url: string,
    data?: object,
    config?: object
  ): Promise<PGResponse<T>>;

  patch<T>(
    authKey: AuthKey,
    url: string,
    data?: object,
    config?: object
  ): Promise<PGResponse<T>>;

  delete<T>(
    authKey: AuthKey,
    url: string,
    data?: object,
    config?: object
  ): Promise<PGResponse<T>>;
}

export default PaymentGatewayAPI;

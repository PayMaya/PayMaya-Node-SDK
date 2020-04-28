import Currency from '../commons/Currency';

interface RefundParams {
  checkoutId: string;
  reason: string;
  amount: {
    value: number;
    currency: Currency;
  };
}

export default RefundParams;

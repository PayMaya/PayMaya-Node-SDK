import Currency from './Currency';

interface Amount {
  value: number;
  currency?: Currency;
  details?: {
    discount?: number;
    serviceCharge?: number;
    shippingFee?: number;
    tax?: number;
    subtotal: number;
  };
}

export default Amount;

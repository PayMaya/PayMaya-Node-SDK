import Currency from '../commons/Currency';
import RefundStatus from './RefundStatus';

interface Refund {
  id: string;
  reason: string;
  status: RefundStatus;
  createdAt: Date;
  amount: {
    value: number;
    currency: Currency;
  };
  checkout: string;
}

export default Refund;

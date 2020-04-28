import Amount from '../commons/Amount';

interface Item {
  name: string;
  quantity: number;
  code: string;
  description: string;
  amount: Amount;
  totalAmount: Amount;
}

export default Item;

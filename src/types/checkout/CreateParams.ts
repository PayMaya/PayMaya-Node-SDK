import Address from '../commons/Address';
import Amount from '../commons/Amount';
import ContactInfo from '../commons/ContactInfo';
import Sex from '../commons/Sex';
import CheckoutRedirectUrl from './CheckoutRedirectUrl';
import Item from './Item';
import ShippingType from './ShippingType';

interface CreateParams {
  totalAmount: Amount;
  buyer: PersonName & {
    birthday: string;
    customerSince: string;
    sex: Sex;
    contact: ContactInfo;
    shippingAddress: PersonName & Address & ContactInfo & {
      shippingType: ShippingType;
    };
    billingAddress: Address;
  };
  items: Item[];
  redirectUrl: CheckoutRedirectUrl;
  requestReferenceNumber: string;
  metadata?: object;
}

export default CreateParams;

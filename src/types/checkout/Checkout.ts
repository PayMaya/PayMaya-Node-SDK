import Address from '../commons/Address';
import Amount from '../commons/Amount';
import ContactInfo from '../commons/ContactInfo';
import Currency from '../commons/Currency';
import Locale from '../commons/Locale';
import Sex from '../commons/Sex';
import CheckoutRedirectUrl from './CheckoutRedirectUrl';
import CheckoutStatus from './CheckoutStatus';
import Item from './Item';
import PaymentScheme from './PaymentScheme';
import PaymentStatus from './PaymentStatus';
import SupportedSchemes from './SupportedSchemes';

interface Link {
  rel: string;
  href: string;
}

interface Checkout {
  id: string;
  items: Item[];
  requestReferenceNumber: string;
  createdAt: Date;
  updatedAt?: Date;
  expiredAt?: Date;
  paymentScheme: PaymentScheme;
  expressCheckout: boolean;
  refundedAmount: boolean;
  canPayPal: boolean;
  status: CheckoutStatus;
  paymentStatus: PaymentStatus;
  paymentDetails: {
    responses: {
      data: {
        efs: {
          financialNetworkCode: string;
          acquirerResponseCode: string;
          transactionNumber: string;
          cardType: string;
          transactionIdentifier: string;
          marketSpecificData?: string;
          commercialCardIndicator: string;
          cardLevelIndicator?: string;
          maskedResponseMetadatadCardNumber?: string;
          riskCategory: string;
          returnACI?: string;
          authorizeId: string;
          riskScore: number;
          commercialCard: string;
          batchNumber: string;
          receipt_number: string;
        };
      };
      links: Link[];
      metadata: {
        transaction_reference_no: string;
      };
    };
    paymentAt: Date;
    '3ds': boolean;
  };
  buyer: PersonName & {
    contact: ContactInfo;
    billingAddress: Address;
    shippingAddress: Address;
    ipAddress: string;
    birthday: string;
    sex: Sex;
  };
  merchant: {
    currency: Currency;
    email: string;
    locale: Locale;
    homepageUrl: string;
    isEmailToMerchantEnabled: boolean;
    isEmailToBuyerEnabled: boolean;
    isPaymentFacilitator: boolean;
    isPageCustomized: boolean;
    supportedSchemes: SupportedSchemes;
    canPayPal: boolean;
    payPalEmail?: string;
    payPalWebExperienceId?: string;
    expressCheckout: boolean;
    name: string;
  };
  totalAmount: Amount;
  redirectUrl: CheckoutRedirectUrl;
  transactionReferenceNumber: string;
  metadata?: string;
}

export default Checkout;

type PaymentStatus = 'PENDING_PAYMENT'
  | 'AUTH_SUCCESS'
  | 'AUTH_FAILED'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_EXPIRED'
  | 'PAYMENT_CANCELLED'
  | 'VOIDED'
  | 'REFUNDED'

export default PaymentStatus;

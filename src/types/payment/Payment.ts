interface Payment {
  id: string;
  isPaid: boolean;
  status: string;
  amount: number;
  currency: string;
  canVoid: boolean;
  canRefund: boolean;
  canCapture: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  paymentTokenId?: string;
  batchNumber?: string;
  traceNumber?: string;
  authorizationType?: string;
  capturedAmount?: number;
  authorizationPayment?: Payment;
  fundSource?: {
    type?: string;
    id?: string;
    description?: string;
    details?: unknown;
  };
  metadata?: object;
  requestReferenceNumber?: string;
  verificationUrl?: string;
  approvalCode?: string;
  receiptNumber?: string;
  emvIccData?: string;
  receipt?: unknown;
  capturedPaymentId?: string;
  subscription?: unknown;
}

export default Payment;

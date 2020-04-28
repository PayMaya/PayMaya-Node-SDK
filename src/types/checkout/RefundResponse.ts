import RefundStatus from './RefundStatus';

interface RefundResponse {
  refundId: string;
  status: RefundStatus;
}

export default RefundResponse;

interface PGResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: object;
}

export default PGResponse;

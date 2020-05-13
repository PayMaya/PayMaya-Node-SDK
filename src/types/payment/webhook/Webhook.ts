interface Webhook {
  id: string;
  name: string;
  callbackUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Webhook;

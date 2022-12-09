export interface Retailer {
  _id?: any;
  createdAt: Date;
  updatedAt?: Date;
  tradingName: string;
  corporateEntity: string;
  deliveryAddress: {
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    postcode: number;
  };
  emailAddress: string;
  phoneNumber: string;
  abn: string;
  status: string;
}

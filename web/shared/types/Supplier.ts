export interface Supplier {
  _id?: any;
  createdAt: Date;
  updatedAt?: Date;
  tradingName: string;
  corporateEntity: string;
  address: {
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

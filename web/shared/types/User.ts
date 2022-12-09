import type { Retailer } from './Retailer';

export type UserStatus = 'active' | 'deactivated';

export type UserRole = 'super' | 'admin' | 'customer';

export interface User {
  _id?: any;
  createdAt: Date;
  updatedAt?: Date;
  email: string;
  phoneNum?: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  role: UserRole;
  myRetailers: Retailer[];
}

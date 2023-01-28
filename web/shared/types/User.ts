import type { Retailer } from './Retailer';
import { Supplier } from './Supplier';

export type UserStatus = 'active' | 'deactivated';

export type UserRole = 'super' | 'supplier' | 'retailer';

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
  myRetailer?: Retailer;
  mySupplier?: Supplier;
}

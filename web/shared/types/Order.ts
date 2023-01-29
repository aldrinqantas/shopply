import { Category } from './Category';
import { Retailer } from './Retailer';
import { Supplier } from './Supplier';
import { User } from './User';

export interface OrderProductItem {
  _id: string;
  name: string;
  sku?: string;
  description?: string;
  tags: string[];
  sellPrice: number;
  quantity: number;
  categories: Category[];
  images: string[];
}
export interface OrderActivity {
  createdAt: Date;
  description: string;
  extra: any;
}

export enum ORDER_STATUS {
  PLACED = 'Placed',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}
export interface Order {
  _id?: any;
  createdAt: Date;
  updatedAt?: Date;
  supplier: Supplier;
  retailer: Retailer;
  products: OrderProductItem[];
  status: string;
  orderBy: User;
  deliveryDate: Date;
  comment?: string;
  activity: OrderActivity[];
}

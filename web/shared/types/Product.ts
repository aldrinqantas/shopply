import type { Category } from './Category';
import type { Supplier } from './Supplier';

export interface Product {
  _id?: any;
  createdAt: Date;
  updatedAt?: Date;
  supplier: Supplier | string;
  name: string;
  sku?: string;
  description?: string;
  tags: string[];
  sellPrice: number;
  categories: Category[] | string[];
  images?: string;
}

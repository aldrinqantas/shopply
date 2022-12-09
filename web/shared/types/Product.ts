import type { Category } from './Category';

export interface Product {
  _id?: any;
  createdAt: Date;
  updatedAt?: Date;
  name: string;
  sku?: string;
  description?: string;
  tags: string[];
  sellPrice: number;
  categories: Category[] | string[];
  imageUrl?: string;
}

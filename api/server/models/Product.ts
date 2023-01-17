import mongoose, { PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import type { Category } from './Category';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const mongoSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  supplier: {
    type: ObjectId,
    ref: 'Supplier',
  },
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  sellPrice: {
    type: Number,
    default: 0,
  },
  categories: {
    type: [ObjectId],
    default: [],
    ref: 'Category',
  },
  images: {
    type: [String],
    default: [],
  },
});

mongoSchema.plugin(mongoosePaginate);

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
  images?: string;
}

interface ProductModel extends PaginateModel<Product> {
  publicFields(): string[];
  add({
    supplier,
    name,
    sku,
    description,
    sellPrice,
    categories,
    images,
  }: {
    supplier: string;
    name: string;
    sku: string;
    description: string;
    sellPrice: number;
    categories: string[];
    images: string;
  }): Promise<Category>;
}

class ProductClass extends mongoose.Model {
  public static publicFields(): string[] {
    return ['_id', 'name', 'sku', 'description', 'tags', 'sellPrice', 'categories', 'imageUrl'];
  }

  static async add({ supplier, name, sku, description, sellPrice, categories, imageUrl }) {
    try {
      const newProduct = await this.create({
        supplier,
        name,
        sku,
        description,
        sellPrice,
        categories,
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return newProduct;
    } catch (error) {
      throw error;
    }
  }
}

mongoSchema.loadClass(ProductClass);

const Product = mongoose.model<Product, ProductModel>('Product', mongoSchema);

export default Product;

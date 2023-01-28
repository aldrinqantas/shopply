import mongoose, { PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import type { Category } from './Category';
import type { Supplier } from './Supplier';
import type { Retailer } from './Retailer';
import type { User } from './User';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const orderProductSchema = new Schema({
  _id: { type: ObjectId, required: true },
  name: { type: String, required: true },
  sku: String,
  description: String,
  tags: [String],
  sellPrice: Number,
  quantity: { type: Number, required: true },
  categories: {
    type: [ObjectId],
    ref: 'Category',
  },
  images: [String],
});

const activitySchema = new Schema({
  createdAt: Date,
  description: String,
  extra: Object,
});

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
    required: true,
  },
  retailer: {
    type: ObjectId,
    ref: 'Retailer',
    required: true,
  },
  products: {
    type: [orderProductSchema],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  orderBy: {
    type: ObjectId,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
  },
  activity: {
    type: [activitySchema],
    default: [],
  },
});

mongoSchema.plugin(mongoosePaginate);

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

type OrderModel = PaginateModel<Order>;

class OrderClass extends mongoose.Model {}

mongoSchema.loadClass(OrderClass);

const Order = mongoose.model<Order, OrderModel>('Order', mongoSchema);

export default Order;

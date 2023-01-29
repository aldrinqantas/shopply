import mongoose, { PassportLocalModel, PassportLocalDocument, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

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
  tradingName: {
    type: String,
    required: true,
  },
  corporateEntity: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    line1: String,
    line2: String,
    suburb: String,
    state: String,
    postcode: Number,
  },
  emailAddress: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  abn: {
    type: String,
  },
  status: {
    type: String,
    default: 'Active',
  },
  logo: {
    type: String,
  },
  suppliers: {
    type: [ObjectId],
    ref: 'Supplier',
    default: [],
  },
});

mongoSchema.plugin(mongoosePaginate);

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
  logo: string;
}

export interface RetailerDocument extends PassportLocalDocument, Retailer {}

interface RetailerModel
  extends PassportLocalModel<RetailerDocument>,
    PaginateModel<RetailerDocument> {
  publicFields(): string[];
}

class RetailerClass extends mongoose.Model {
  public static publicFields(): string[] {
    return [
      '_id',
      'tradingName',
      'corporateEntity',
      'deliveryAddress',
      'emailAddress',
      'phoneNumber',
      'logo',
    ];
  }
}

mongoSchema.loadClass(RetailerClass);

const Retailer = mongoose.model<RetailerDocument, RetailerModel>('Retailer', mongoSchema);

export default Retailer;

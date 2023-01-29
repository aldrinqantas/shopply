import mongoose, { PassportLocalModel, PassportLocalDocument, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

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
  address: {
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
});

mongoSchema.plugin(mongoosePaginate);

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
  logo: string;
}

export interface SupplierDocument extends PassportLocalDocument, Supplier {}

interface SupplierModel
  extends PassportLocalModel<SupplierDocument>,
    PaginateModel<SupplierDocument> {
  publicFields(): string[];
}

class SupplierClass extends mongoose.Model {
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

mongoSchema.loadClass(SupplierClass);

const Supplier = mongoose.model<SupplierDocument, SupplierModel>('Supplier', mongoSchema);

export default Supplier;

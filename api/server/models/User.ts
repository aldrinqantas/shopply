import mongoose, { PassportLocalModel, PassportLocalDocument, PaginateModel } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Retailer } from './Retailer';

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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNum: {
    type: String,
  },
  firstName: String,
  lastName: String,
  status: {
    type: String,
    default: 'active',
  },
  role: {
    type: String,
    required: true,
  },
  myRetailers: {
    type: [ObjectId],
    default: [],
  },
});

mongoSchema.plugin(mongoosePaginate);

mongoSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  limitAttempts: true,
  maxAttempts: 10,
  errorMessages: {
    MissingPasswordError: 'No password was given.',
    AttemptTooSoonError: 'Account is currently locked. Try again later.',
    TooManyAttemptsError: 'Account locked due to too many failed login attempts.',
    NoSaltValueStoredError:
      "This account doesn't have a password set - perhaps you normally log in with Google.",
    IncorrectPasswordError: 'The password you entered is incorrect.',
    IncorrectUsernameError: "We couldn't find an account with the email you entered.",
    MissingUsernameError: 'No email was given.',
    UserExistsError: 'A user with the given email is already registered.',
  },
});
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

export interface UserDocument extends PassportLocalDocument, User {}

interface UserModel extends PassportLocalModel<UserDocument>, PaginateModel<UserDocument> {
  publicFields(): string[];
  add({}): Promise<UserDocument>;
}

class UserClass extends mongoose.Model {
  public static publicFields(): string[] {
    return ['_id', 'email', 'phoneNum', 'firstName', 'lastName', 'status', 'role', 'myRetailers'];
  }

  public static async add({ email, phoneNum, firstName, lastName, role = 'staff', permissions }) {
    if (!email) {
      throw new Error('Bad data');
    }

    return this.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      email,
      phoneNum,
      firstName,
      lastName,
      role,
      permissions,
    });
  }
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model<UserDocument, UserModel>('User', mongoSchema);

export default User;

import mongoose from 'mongoose';

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
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
});

export interface Category {
  _id?: any;
  createdAt: Date;
  updatedAt?: Date;
  name: string;
  slug: string;
  imageUrl?: string;
}

interface CategoryModel extends mongoose.Model<Category> {
  add({
    supplier,
    name,
    slug,
  }: {
    supplier: string;
    name: string;
    slug: string;
  }): Promise<Category>;
}

class CategoryClass extends mongoose.Model {
  static async add({ supplier, name, slug }) {
    try {
      const newCategory = await this.create({
        supplier,
        name,
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return newCategory;
    } catch (error) {
      throw error;
    }
  }
}

mongoSchema.loadClass(CategoryClass);

const Category = mongoose.model<Category, CategoryModel>('Category', mongoSchema);

export default Category;

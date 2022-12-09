import fetch from 'node-fetch';

import User from '../models/User';
import Product from '../models/Product';
import Category from '../models/Category';
import logger from '../logger';
import { slugify } from '../utils/slugify';

const ADMIN_USER = {
  email: 'admin@gmail.com',
  firstName: 'John',
  lastName: 'Admin',
  password: 'ShopplyAdmin',
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function insertAdminUser() {
  try {
    const docs = await User.find({});
    if (docs.length !== 0) return;

    const admin = new User({
      email: ADMIN_USER.email,
      firstName: ADMIN_USER.firstName,
      lastName: ADMIN_USER.lastName,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await User.register(admin, ADMIN_USER.password);
  } catch (error) {
    throw error;
  }
}

async function insertProducts() {
  try {
    const categoryDocs = await Category.find({});
    const productDocs = await Product.find({});

    if (categoryDocs.length !== 0 && productDocs.length) return;

    const categoryRes = await fetch('https://fakestoreapi.com/products/categories');
    const categories = (await categoryRes.json()) as string[];
    categories.forEach(async (category) => {
      const newCategory = await Category.add({
        name: capitalizeFirstLetter(category),
        slug: slugify(category),
      });
      logger.info(`Category ${newCategory.name} added`);

      const productRes = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const products = (await productRes.json()) as any[];
      products.forEach(async (product) => {
        await Product.add({
          name: product.title,
          sku: product.id,
          description: product.description,
          sellPrice: product.price,
          categories: [newCategory._id],
          imageUrl: product.image,
        });
      });
    });
  } catch (error) {
    throw error;
  }
}

export default async function insertData() {
  try {
    await insertAdminUser();
    await insertProducts();
  } catch (error) {
    logger.error(error);
  }
}

import fetch from 'node-fetch';

import User from '../models/User';
import Supplier from '../models/Supplier';
import Retailer from '../models/Retailer';
import Category from '../models/Category';
import Product from '../models/Product';
import logger from '../logger';
import { SUPPLIERS } from './supplierData';
import { RETAILERS } from './retailerData';

async function insertSupplierUser(supplierId, user) {
  try {
    const newUser = new User({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'supplier',
      mySupplier: supplierId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await User.register(newUser, user.password);
  } catch (error) {
    throw error;
  }
}

async function insertProducts(supplierId, categories) {
  try {
    categories.forEach(async (category) => {
      const newCategory = await Category.add({
        supplier: supplierId,
        name: category.name,
        slug: category.slug,
        image: category.image,
      });
      logger.info(`Category ${newCategory.name} added`);

      const productRes = await fetch(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${category.apiId}`,
      );
      const products = (await productRes.json()) as any[];
      products.forEach(async (product) => {
        await Product.add({
          supplier: supplierId,
          name: product.title,
          sku: product.id,
          description: product.description,
          sellPrice: product.price,
          categories: [newCategory._id],
          images: product.images,
        });
      });
    });
  } catch (error) {
    throw error;
  }
}

async function insertSuppliers() {
  try {
    const docs = await Supplier.find({});
    if (docs.length !== 0) return;

    SUPPLIERS.forEach(async (supplier) => {
      const newSupplier = await Supplier.create({
        tradingName: supplier.tradingName,
        corporateEntity: supplier.corporateEntity,
        address: supplier.address,
        emailAddress: supplier.emailAddress,
        phoneNumber: supplier.phoneNumber,
        abn: supplier.abn,
        status: supplier.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await insertSupplierUser(newSupplier._id, supplier.user);

      await insertProducts(newSupplier._id, supplier.categories);
    });
  } catch (error) {
    throw error;
  }
}

async function insertRetailerUser(retailerId, user) {
  try {
    const newUser = new User({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'retailer',
      myRetailer: retailerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await User.register(newUser, user.password);
  } catch (error) {
    throw error;
  }
}

async function insertRetailers() {
  try {
    const docs = await Retailer.find({});
    if (docs.length !== 0) return;

    const suppliers = await Supplier.find({});
    if (suppliers.length === 0) return;

    RETAILERS.forEach(async (retailer) => {
      const newRetailer = await Retailer.create({
        tradingName: retailer.tradingName,
        corporateEntity: retailer.corporateEntity,
        address: retailer.address,
        emailAddress: retailer.emailAddress,
        phoneNumber: retailer.phoneNumber,
        abn: retailer.abn,
        status: retailer.status,
        suppliers: suppliers.map((supplier) => supplier._id),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await insertRetailerUser(newRetailer._id, retailer.user);
    });
  } catch (error) {
    throw error;
  }
}

export default async function insertData() {
  try {
    await insertSuppliers();
    await insertRetailers();
  } catch (error) {
    logger.error(error);
  }
}

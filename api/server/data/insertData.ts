import User from '../models/User';
import Supplier from '../models/Supplier';
import logger from '../logger';

const SUPPLIER_USER_1 = {
  email: 'admin_supplier_1@gmail.com',
  firstName: 'John',
  lastName: 'Admin',
  password: 'ShopplyAdmin',
};

const SUPPLIER_USER_2 = {
  email: 'admin_supplier_2@gmail.com',
  firstName: 'Bob',
  lastName: 'Admin',
  password: 'ShopplyAdmin',
};

const SUPPLIERS = [
  {
    tradingName: 'Supplier One Store',
    corporateEntity: 'Supplier One Pty Ltd',
    address: {
      line1: '1 Good Street',
      line2: '',
      suburb: 'A Suburb',
      state: 'NSW',
    },
    emailAddress: 'admin_supplier_1@gmail.com',
    phoneNumber: '0412345678',
    abn: '12345678901',
    status: 'Active',
    user: SUPPLIER_USER_1,
  },
  {
    tradingName: 'Supplier Two Store',
    corporateEntity: 'Supplier Two Pty Ltd',
    address: {
      line1: '1 Nice Street',
      line2: '',
      suburb: 'B Suburb',
      state: 'NSW',
    },
    emailAddress: 'admin_supplier_1@gmail.com',
    phoneNumber: '0412345678',
    abn: '12345678901',
    status: 'Active',
    user: SUPPLIER_USER_2,
  },
];

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
    });
  } catch (error) {
    throw error;
  }
}

// async function insertProducts() {
//   try {
//     const categoryDocs = await Category.find({});
//     const productDocs = await Product.find({});

//     if (categoryDocs.length !== 0 && productDocs.length) return;

//     const categoryRes = await fetch('https://fakestoreapi.com/products/categories');
//     const categories = (await categoryRes.json()) as string[];
//     categories.forEach(async (category) => {
//       const newCategory = await Category.add({
//         name: capitalizeFirstLetter(category),
//         slug: slugify(category),
//       });
//       logger.info(`Category ${newCategory.name} added`);

//       const productRes = await fetch(`https://fakestoreapi.com/products/category/${category}`);
//       const products = (await productRes.json()) as any[];
//       products.forEach(async (product) => {
//         await Product.add({
//           name: product.title,
//           sku: product.id,
//           description: product.description,
//           sellPrice: product.price,
//           categories: [newCategory._id],
//           imageUrl: product.image,
//         });
//       });
//     });
//   } catch (error) {
//     throw error;
//   }
// }

export default async function insertData() {
  try {
    await insertSuppliers();
  } catch (error) {
    logger.error(error);
  }
}

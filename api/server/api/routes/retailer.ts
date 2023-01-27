import * as express from 'express';

import Retailer from '../../models/Retailer';
import Supplier from '../../models/Supplier';
import Category from '../../models/Category';
import Product from '../../models/Product';

const router = express.Router();

router.use((req: any, res, next) => {
  console.log('retailer API', req.path);
  if (req.user && req.user.role === 'retailer') {
    next();
    return;
  }

  res.status(401).json({ error: 'Unauthorized' });
});

router.get('/my-suppliers', async (req: any, res, next) => {
  try {
    const { user } = req;

    const retailer: any = await Retailer.findById(user.myRetailer)
      .populate('suppliers', Supplier.publicFields())
      .lean();

    res.json(retailer.suppliers);
  } catch (err) {
    next(err);
  }
});

router.get('/suppliers/:supplierId', async (req: any, res, next) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findById(supplierId, Supplier.publicFields()).lean();
    const categories = await Category.find({ supplier: supplierId }).lean();

    res.json({ ...supplier, categories });
  } catch (err) {
    next(err);
  }
});

router.get('/products/category/:categorySlug', async (req: any, res, next) => {
  try {
    const { categorySlug } = req.params;

    const category = await Category.findOne({ slug: categorySlug });
    const products = await Product.find({ categories: category._id })
      .select(Product.publicFields())
      .sort({ name: 1 });

    res.json(products);
  } catch (err) {
    next(err);
  }
});

export default router;

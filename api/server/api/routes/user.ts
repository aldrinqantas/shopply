import * as express from 'express';

import Category from '../../models/Category';
import Product from '../../models/Product';

const router = express.Router();

router.use((req: any, res, next) => {
  console.log('user API', req.path);
  if (req.user) {
    next();
    return;
  }

  res.status(401).json({ error: 'Unauthorized' });
});

router.post('/get-initial-data', async (_: any, res, next) => {
  try {
    const categories = await Category.find({}).select('_id name slug imageUrl');

    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

router.get('/products', async (_: any, res, next) => {
  try {
    const products = await Product.find({}).select(Product.publicFields());

    res.json(products);
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

import * as express from 'express';

import Retailer from '../../models/Retailer';
import Product from '../../models/Product';
import Category from '../../models/Category';
import Order from '../../models/Order';

const router = express.Router();

router.use((req: any, res, next) => {
  console.log('supplier API', req.path);
  if (req.user && req.user.role === 'supplier') {
    next();
    return;
  }

  res.status(401).json({ error: 'Unauthorized' });
});

router.get('/retailers', async (req: any, res, next) => {
  try {
    const { user } = req;
    const retailers = await Retailer.find({ suppliers: user.mySupplier })
      .sort({ tradingName: 1 })
      .lean();

    res.json(retailers);
  } catch (err) {
    next(err);
  }
});

// TODO: verify that the retailer belongs to the supplier
router.get('/retailers/:id', async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const retailer = await Retailer.findById(id).lean();

    res.json(retailer);
  } catch (err) {
    next(err);
  }
});

router.get('/products', async (req: any, res, next) => {
  try {
    const { user } = req;
    const products = await Product.find({ supplier: user.mySupplier })
      .populate('categories')
      .sort({ name: 1 })
      .lean();

    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/categories', async (req: any, res, next) => {
  try {
    const { user } = req;
    const products = await Category.find({ supplier: user.mySupplier }).sort({ name: 1 }).lean();

    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/orders', async (req: any, res, next) => {
  try {
    const { deliveryStart, deliveryEnd } = req.query;

    const query: any = {};

    if (deliveryStart && deliveryEnd) {
      query.deliveryDate = { $gte: deliveryStart, $lt: deliveryEnd };
    }

    const orders = await Order.find(query)
      .populate('retailer', Retailer.publicFields())
      .sort({ _id: -1 })
      .lean();

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

export default router;

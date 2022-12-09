import * as express from 'express';

import Retailer from '../../models/Retailer';

const router = express.Router();

router.use((req: any, res, next) => {
  console.log('admin API', req.path);
  if (req.user.isAdmin) {
    next();
    return;
  }

  res.status(401).json({ error: 'Unauthorized' });
});

// Retailer
router.post('/retailers/add', async (req: any, res, next) => {
  try {
    const { tradingName, corporateEntity, deliveryAddress, emailAddress, phoneNumber, abn } =
      req.body;

    const newRetailer = await Retailer.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      tradingName,
      corporateEntity,
      deliveryAddress,
      emailAddress,
      phoneNumber,
      abn,
    });

    res.json(newRetailer);
  } catch (err) {
    next(err);
  }
});

router.get('/retailers/list', async (_, res, next) => {
  try {
    const retailers = await Retailer.find({}).sort({ tradingName: 1 }).lean();

    res.json(retailers);
  } catch (err) {
    next(err);
  }
});

router.get('/retailers/:id', async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const retailer = await Retailer.findById(id).lean();

    res.json(retailer);
  } catch (err) {
    next(err);
  }
});

export default router;

import * as express from 'express';

const router = express.Router();

router.get('/get-user', async (req, res) => {
  res.json({ user: req.user || null });
});

export default router;

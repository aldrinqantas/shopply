import * as express from 'express';

const router = express.Router();

router.get('/hello', async (_, res) => {
  res.json({ success: true });
});

router.get('/get-user', async (req, res) => {
  res.json({ user: req.user || null });
});

export default router;

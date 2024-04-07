import express, { Request, Response } from 'express';

const router = express.Router();

router.delete('/api/orders/:orderId', (req: Request, res: Response) => {
  res.send('Orders service is up and running!');
});

export { router as deleteOrderRouter}
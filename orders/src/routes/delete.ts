import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@vm92tickets/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../models/orders";

const router = express.Router();

router.delete('/api/orders/:orderId', requireAuth,async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId)

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status=OrderStatus.Cancelled;
  await order.save();

  res.status(204).send(order);
  
});

export { router as deleteOrderRouter}
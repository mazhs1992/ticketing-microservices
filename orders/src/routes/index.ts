import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@vm92tickets/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../models/orders";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.currentUser!.id }).populate('ticket');
    res.send(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error fetching orders' });
  }
});


export { router as indexOrderRouter };

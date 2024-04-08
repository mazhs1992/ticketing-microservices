import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@vm92tickets/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order } from "../models/orders";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if(!order){
      throw new NotFoundError();
    }
    if(order.userId !== req.currentUser!.id){
      throw new NotAuthorizedError();
    }

    res.send(order);
  },
);

export { router as showOrderRouter };

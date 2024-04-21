import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@vm92tickets/common";
import { Order } from "../models/orders";
import { natsWrapper } from "../nats-wrapper";

import {stripe} from '../stripe'

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
 async (req: Request, res: Response) => {

    const {token,orderId} = req.body

    const order = await Order.findById(orderId)

    if(!order){
        throw new NotFoundError()
    }
    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorizedError()
    }

    if(order.status === OrderStatus.Cancelled){
        throw new BadRequestError('Can not pay for an cancelled order')
    }
    const charge = await stripe.charges.create({
        amount: order.price*100,
        currency: 'usd',
        source: token
      });
    

  },
);

export { router as createChargeRouter };

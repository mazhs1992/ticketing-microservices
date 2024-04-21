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
import { Payment } from "../models/payments";
import { natsWrapper } from "../nats-wrapper";

import { PaymentCreatedPublisher } from "../events/listeners/publisher/payment-created-publisher";

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

      const payment =  Payment.build({
        orderId,
        stripeId:charge.id
      })

      await payment.save()
      await new PaymentCreatedPublisher(natsWrapper.client).publish({
        id:payment.id,
        orderId:payment.orderId,
        stripeId:payment.stripeId
      })
    
      res.status(201).send({success:true})

  },
);

export { router as createChargeRouter };

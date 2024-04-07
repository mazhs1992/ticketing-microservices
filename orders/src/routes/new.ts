import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@vm92tickets/common";
import mongoose from "mongoose";
import { natsWrapper } from "../nats-wrapper";
import { Ticket } from "../models/ticket";
import { Order } from "../models/orders";
import { OrderStatus } from "@vm92tickets/common";

const router = express.Router();

router.post(
  "/api/orders/",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //find the ticket the user is trying to order in the database
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    //make sure that the ticket is not already reserved
    //Run query to look at all orders. Find an order where the ticket
    //is the ticket we just found and the orders status is not cancelled

    let existingOrder = await Order.findOne({
      ticketId: ticketId,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ],
      },
    });

    if(existingOrder){
      throw new BadRequestError("Ticket is already reserved");
    }

    //Calculate an expiration date for this order

    //Build the order and save it to the database

    //Publish an event saying that an order was created

    res.send("Orders service is up and running!");
  },
);

export { router as newOrderRouter };

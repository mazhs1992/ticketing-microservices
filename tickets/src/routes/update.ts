import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from "@vm92tickets/common";

import { Ticket } from "../models/ticket";

const router = express.Router();

import {TicketUpdatedPublisher} from '../events/publishers/ticket-updated-publisher'
import {natsWrapper} from '../nats-wrapper'

router.put(
  "/api/tickets/:id",
  requireAuth,
    [
        body("title").not().isEmpty().withMessage("Title is required"),
        body("price")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0"),
    ],
    validateRequest,
  async (req: Request, res: Response) => {
    const tickets = await Ticket.findById(req.params.id);

    if (!tickets) {
      throw new NotFoundError();
    }


    if (tickets.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const updatedTickets = await Ticket.findOneAndUpdate({_id: req.params.id}, {
        $set:{
            title: req.body.title,
            price: req.body.price
        },        
    },
    {new: true});

    if(!updatedTickets){
      console.error('ERROR ON TICKET')
        throw new NotFoundError();
    }

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: updatedTickets.id,
      title: updatedTickets.title,
      price: updatedTickets.price,
      userId: updatedTickets.userId
    })

    res.status(200).send(updatedTickets);
  },
);

export { router as updateTicketRouter };

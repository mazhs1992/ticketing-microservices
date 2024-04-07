import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@vm92tickets/common";
import mongoose from "mongoose";
import { natsWrapper } from "../nats-wrapper";

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
  (req: Request, res: Response) => {
    res.send("Orders service is up and running!");
  },
);

export { router as newOrderRouter };

import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@vm92tickets/common";
import mongoose from "mongoose";
import { Order } from "../../models/orders";
import request from "supertest";
import { app } from "../../app";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payments";

//FIRST TEST  with mock
// jest.mock("../../stripe");

// it("returns a 204 wuth valid inputs", async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();
//   const order = Order.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     userId,
//     version: 0,
//     price: 20,
//     status: OrderStatus.Created,
//   });

//   await order.save();

//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", global.signin(userId))
//     .send({
//       token: "tok_visa",
//       orderId: order.id,
//     })
//     .expect(201);


//     const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0]
//     expect(chargeOptions.amount).toEqual(20*100)
//     expect(chargeOptions.currency).toEqual('usd')
// });


//SECOND TEST with fetchig data from stripe

it("returns a 204 wuth valid inputs", async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const price = Math.floor(Math.random()*100000)

    const order = Order.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      userId,
      version: 0,
      price,
      status: OrderStatus.Created,
    });
  
    await order.save();
  
    await request(app)
      .post("/api/payments")
      .set("Cookie", global.signin(userId))
      .send({
        token: "tok_visa",
        orderId: order.id,
      })
      .expect(201);
  
      const stripeCharges = await stripe.charges.list({ limit: 50 });
      const stripeCharge = stripeCharges.data.find((charge) => {
        return charge.amount === price * 100;
      });
    
      expect(stripeCharge).toBeDefined();
      expect(stripeCharge!.currency).toEqual('usd');
    
      const payment = await Payment.findOne({
        orderId:order.id,
        stripeId:stripeCharge!.id
      })

      expect(payment).not.toBeNull()
  });
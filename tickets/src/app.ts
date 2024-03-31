import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler,NotFoundError } from "@vm92tickets/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);

app.get("/api/ticketshome", (req, res) => {
  res.send("Hi from ticketsWelcome service!");
});

app.all("*", async () => {
  throw new NotFoundError();
});

//MIDDLEWARE
app.use(errorHandler);



export { app };

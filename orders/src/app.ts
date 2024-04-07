import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler,NotFoundError,currentUser } from "@vm92tickets/common";
import {newOrderRouter} from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes/index";
import { deleteOrderRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);
app.use(currentUser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);


app.get("/api/ticketshome", (req, res) => {
  res.send("Hi from ticketsWelcome service!");
});

app.all("*", async () => {
  throw new NotFoundError();
});

//MIDDLEWARE
app.use(errorHandler);



export { app };
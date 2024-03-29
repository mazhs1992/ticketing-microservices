import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signinUserRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);

app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinUserRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

//MIDDLEWARE
app.use(errorHandler);

app.get("/api/users", (req, res) => {
  res.send("Hi from users service!");
});

export { app };

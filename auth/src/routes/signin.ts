import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();
import { RequestValidationError } from "../errors/request-validation-error";

import { User } from "../models/user";
import jwt from "jsonwebtoken";

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be supplied"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    return res.status(201).send({});
  }
);

export { router as signinUserRouter };

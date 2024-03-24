import express, { Request, Response } from "express";
import { body} from "express-validator";
const router = express.Router();

import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middleware/validate-request";

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be supplied"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {    
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    return res.status(201).send({});
  }
);

export { router as signinUserRouter };

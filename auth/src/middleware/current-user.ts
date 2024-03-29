import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// Augment the Request interface in Express to include a currentUser property
//try delete it
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};

import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import { currentUser } from "../middleware/current-user";

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

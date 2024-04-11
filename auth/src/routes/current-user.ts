import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import { currentUser, requireAuth } from "@vm92tickets/common";

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

import { Router } from "express";
import {
  createUser,
  login,
  logout,
} from "../../modules/users/users.contoller.js";

export const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "hello eiei" });
});

//  ** SIGNUP **
router.post("/", createUser);

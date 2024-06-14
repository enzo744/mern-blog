import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getpsws,
  deletepsw,
  updatepsw,
} from "../controllers/psw.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getpsws", getpsws);
router.delete("/deletepsw/:pswId/:userId", verifyToken, deletepsw);
router.put("/updatepsw/:pswId/:userId", verifyToken, updatepsw);

export default router;

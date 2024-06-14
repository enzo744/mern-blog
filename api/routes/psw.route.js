import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPsws,deletepsw } from "../controllers/psw.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getPsws", getPsws);
router.delete("/deletepsw/:pswId/:userId", verifyToken, deletepsw);

export default router;

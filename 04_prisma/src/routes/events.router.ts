import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createEvent } from "../controllers/eventControllers";

const router = Router();

router.post("/events", authMiddleware, createEvent);

export default router;

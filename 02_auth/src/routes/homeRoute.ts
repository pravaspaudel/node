import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare";

const router = Router();

//protected route
//we can add more layer of authentications
router.get("/home", authMiddleware, (req: Request, res: Response) => {
    res.json({ message: "this is home page" });
});

export default router;

import { Router } from "express";
import {
  getAllUsers,
  createUser,
  detailsUser,
  postContent,
} from "../controllers/userControllers";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", detailsUser);
router.post("/users", createUser);

router.post("/posts", postContent);


export default router;

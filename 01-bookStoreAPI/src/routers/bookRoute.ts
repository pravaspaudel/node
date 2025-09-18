import { Router } from "express";
import { createBook, deleteAllBooks, deleteSingleBooks, getAllBooks, getSingleBook, updateBooks } from "../controllers/bookController";

const router = Router()

router.get("/books",getAllBooks)
router.get("/books/:title",getSingleBook)
router.post("/books",createBook)
router.put("/books/:title",updateBooks)
router.delete("/books",deleteAllBooks)
router.delete("/books/:title",deleteSingleBooks)



export default router;


import express from "express";
import BookController from "../controllers/bookController.js";
import authMiddleware from "../middleware/authentication.js";

const router = express.Router();

router.get("/", BookController.getAllBooks);
router.post("/", authMiddleware, BookController.addBook);
router.put("/:bookId", authMiddleware, BookController.updateBook);
router.delete("/:bookId", authMiddleware, BookController.deleteBook);

export default router;

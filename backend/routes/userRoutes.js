import express from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/authentication.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.get("/", authMiddleware, UserController.getAllUsers);
router.get("/:userId", UserController.getUserById);
router.put("/:userId", authMiddleware, UserController.updateUser);
router.delete("/:userId", authMiddleware, UserController.deleteUser);
router.get("/:userId/transactions", UserController.getUserTransactions);

export default router;

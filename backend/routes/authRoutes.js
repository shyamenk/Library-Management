import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.get("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logOut);

export default router;

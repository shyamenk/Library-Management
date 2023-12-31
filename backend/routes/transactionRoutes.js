import express from "express";
import TransactionController from "../controllers/transactionController.js";

const router = express.Router();

router.post("/request", TransactionController.requestBook);
router.get("/pending", TransactionController.getPendingApproval);
router.post("/approve/:approveId", TransactionController.approveBookRequest);
router.post("/return", TransactionController.returnBook);

export default router;

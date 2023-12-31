import Approval from "../models/Approval.js";
import Book from "../models/Book.js";
import Transaction from "../models/Transaction.js";
const TransactionController = {
  requestBook: async (req, res) => {
    try {
      const { userId, bookId } = req.body;

      const existingApproval = await Approval.findOne({
        user: userId,
        book: bookId,
        status: { $in: ["Pending", "Approved"] },
      });

      if (existingApproval) {
        return res.status(400).json({ message: "Book request already pending or approved" });
      }

      const newApproval = await Approval.create({
        user: userId,
        book: bookId,
        status: "Pending",
      });

      res
        .status(201)
        .json({ message: "Book request sent for admin approval", approval: newApproval });
    } catch (error) {
      res.status(500).json({ message: "Failed to send book request", error: error.message });
    }
  },

  getPendingApproval: async (req, res) => {
    try {
      const approvals = await Approval.find({ status: "Pending" })
        .populate("user", "name")
        .populate("book", "name");

      if (approvals.length === 0) {
        return res.status(200).json({ message: "No pending approvals found" });
      }
      const formattedApprovals = approvals.map((approval) => ({
        id: approval._id,
        status: approval.status,
        userName: approval.user.name,
        bookName: approval.book.name,
      }));

      res.status(200).json({ message: "Pending approvals", formattedApprovals });
    } catch (error) {
      res.status(500).json({ message: "Failed to get pending approvals", error: error.message });
    }
  },

  approveBookRequest: async (req, res) => {
    const { approveId } = req.params;
    try {
      const approval = await Approval.findById(approveId);

      if (!approval) {
        return res.status(404).json({ message: "Invalid approval request" });
      }

      approval.status = "Approved";
      await approval.save();

      const newTransaction = await Transaction.create({
        user: approval.user,
        book: approval.book,
        dueDate: new Date(),
        transactionType: "Borrowed",
      });

      await Book.findByIdAndUpdate(approval.book._id, { availabilityStatus: "Borrowed" });

      await Approval.findByIdAndDelete(approval._id);
      res.status(200).json({ message: "Book request approved", transaction: newTransaction });
    } catch (error) {
      res.status(500).json({ message: "Failed to approve book request", error: error.message });
    }
  },

  returnBook: async (req, res) => {
    try {
      const { userId, bookId } = req.body;

      const borrowedTransaction = await Transaction.findOne({
        user: userId,
        book: bookId,
        transactionType: "Borrowed",
      });

      if (!borrowedTransaction) {
        return res.status(404).json({ message: "No borrowed transaction found for this book" });
      }

      borrowedTransaction.transactionType = "Returned";
      await borrowedTransaction.save();

      await Book.findByIdAndUpdate(bookId, { availabilityStatus: "Available" });

      res
        .status(200)
        .json({ message: "Book returned successfully", transaction: borrowedTransaction });
    } catch (error) {
      res.status(500).json({ message: "Failed to return book", error: error.message });
    }
  },
};

export default TransactionController;

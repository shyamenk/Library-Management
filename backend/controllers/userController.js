import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import passwordUtils from "../utils/passwordUtils.js";

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, name, email, contactNumber, password, role } = req.body;

      const hashedPassword = await passwordUtils.hashPassword(password);

      const newUser = await User.create({
        username,
        name,
        email,
        contactNumber,
        role,
        password: hashedPassword,
      });
      res.status(201).json({ newUser, message: "Signup successful! You can now sign in." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ role: "User" });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("user", user);
      res.status(200).json({ user, message: "User found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const userData = req.body;

    try {
      const user = await User.findByIdAndUpdate(userId, userData, { new: true });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user, message: "User updated" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserTransactions: async (req, res) => {
    try {
      const { userId } = req.params;

      const transactions = await Transaction.find({ user: userId }).populate("book");
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default UserController;

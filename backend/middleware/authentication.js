import User from "../models/User.js";
import { verifyToken } from "../utils/token.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  const secretKey = process.env.ACCESS_TOKEN_SECRET;

  try {
    if (!token) {
      throw new Error("Access denied. No token provided.");
    }

    const decoded = verifyToken(token, secretKey);
    const { email, role } = decoded.UserInfo;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Unauthorized user");
    }

    if (user.role !== "Admin") {
      throw new Error("Access denied. Admin privileges required.");
    }

    req.email = email;
    req.role = role;
    next();
  } catch (error) {
    let statusCode = 401;
    if (error.message.includes("Access denied")) {
      statusCode = 403;
    }
    res.status(statusCode).json({ message: error.message });
  }
};

export default authMiddleware;

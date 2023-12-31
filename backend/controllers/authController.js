import User from "../models/User.js";
import passwordUtils from "../utils/passwordUtils.js";
import { generateAccessToken, verifyToken } from "../utils/token.js";

const AuthController = {
  refresh: async (req, res) => {
    try {
      const refreshToken = req.cookies.jwt;

      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
      }

      const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = generateAccessToken(decoded.email, decoded.role);

      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Invalid input. Please provide valid email and password." });
      }
      const user = await User.findOne({ email });

      if (!user || !(await passwordUtils.comparePassword(password, user.password))) {
        return res
          .status(401)
          .json({ message: "Oops! Incorrect email or password. Please check your credentials." });
      }

      const accessToken = generateAccessToken(user._id, user.email, user.role);

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  logOut: async (req, res) => {
    try {
      res.clearCookie("jwt");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default AuthController;

import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, email, role) => {
  return jwt.sign(
    {
      UserInfo: { userId, email, role },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );
};

export const generateRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

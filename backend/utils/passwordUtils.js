import bcrypt from "bcrypt";

const passwordUtils = {
  hashPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error("Password hashing failed");
    }
  },
  comparePassword: async (password, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error("Password comparison failed");
    }
  },
};

export default passwordUtils;

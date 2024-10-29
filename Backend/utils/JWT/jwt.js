import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export const createToken = (userId) => {
  const payload = {
    userId,

  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Named export for CheckToken function
export const checkToken = (token) => {
    try {
      const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
      return parsedToken;
    } catch (error) {
      console.error('Invalid token:', error);
      throw new Error('Invalid token');
    }
  };
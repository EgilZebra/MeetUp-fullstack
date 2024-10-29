const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createToken = (userId) => {
  const payload = {
    userId,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

// Named export for checkToken function
const checkToken = (token) => {
  try {
    const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
    return parsedToken;
  } catch (error) {
    console.error('Invalid token:', error);
    throw new Error('Invalid token');
  }
};

// Export the functions
module.exports = {
  createToken,
  checkToken,
};

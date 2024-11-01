const bcrypt = require('bcryptjs');

const saltRounds = 10;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Export the functions
module.exports = {
    hashPassword,
    comparePassword,
};
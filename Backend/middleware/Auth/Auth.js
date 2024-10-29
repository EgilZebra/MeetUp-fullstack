const { checkToken } = require('../../utils/JWT/jwt');
const { db } = require("../../services/db");
const { GetCommand } = require('@aws-sdk/lib-dynamodb');
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const authToken = req.headers.authorization || req.headers.Authorization;

    // Allow /signup and /auth/signup routes without a token
    if (req.path === '/signup' || req.path === '/auth/signup') {
        return next();
    }

    if (!authToken) {
        return res.status(401).json({ error: 'Unauthorized without token' });
    }

    try {
        const token = authToken.replace("Bearer ", "").trim();
        const verifiedToken = checkToken(token);

        if (!verifiedToken || !verifiedToken.userId) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const params = {
            TableName: process.env.TABLE_NAME_USERS,
            Key: {
                userId: verifiedToken.userId // Ensure this matches the attribute name in your table
            }
        };

        // Fetch the user from DynamoDB
        const user = await db.send(new GetCommand(params));

        if (!user.Item) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = {
            userId: verifiedToken.userId,
            username: user.Item.username
        };
        next();
    } catch (error) {
        console.error("Token is not valid. Unauthorized.", error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;

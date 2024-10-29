import express from 'express';
import { db } from '../../Services/db.js';
import { sendResponse, sendError } from '../../Response/response.js';
import { comparePassword } from '../../utils/bcrypt.js';
import { createToken } from '../../utils/JWT/jwt.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return sendError(res, 400, 'Username and Password are required');
    }

    try {
        const params = {
            TableName: process.env.TABLE_NAME_USERS,
            IndexName: 'Username_Index',
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': username,
            },
        };

        const data = await db.query(params);
        const User = data.Items[0];

        if (!User) {
            return sendError(res, 404, 'User not found');
        }

        const validPassword = await comparePassword(password, User.password);

        if (!validPassword) {
            return sendError(res, 400, { error: 'Invalid Password' });
        }

        const token = createToken(User.userId);
        return sendResponse(res, 200, { success: true, message: 'Login successful', token: token });

    } catch (error) {
        console.error('Problem with login:', error);
        return sendError(res, 500, { success: false, error: 'Problem with login' });
    }
});

export default router;

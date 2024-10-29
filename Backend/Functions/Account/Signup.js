import express from 'express';
import { db } from '../../Services/db.js';
import { sendResponse, sendError } from '../../Response/response.js';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../utils/bcrypt.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return sendError(res, 400, { success: false, error: 'Username and Password are required' });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const userId = uuidv4();

        const params = {
            TableName: process.env.TABLE_NAME_USERS,
            Item: {
                userId: userId,
                username: username,
                password: hashedPassword,
            },
        };

        // Use PutCommand to add the new user to DynamoDB
        await db.send(new PutCommand(params));
        return sendResponse(res, 200, { success: true, message: 'Account created successfully' });

    } catch (error) {
        console.error('Error creating account:', error);
        return sendError(res, 500, { success: false, error: 'Problem with creating account' });
    }
});

export default router;

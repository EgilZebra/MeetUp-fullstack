const express = require('express');
const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../Response/response');
const { comparePassword } = require('../../utils/bcrypt');
const { createToken } = require('../../utils/JWT/jwt');
const { ScanCommand } = require('@aws-sdk/lib-dynamodb');

const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return sendError(res, 400, 'Username and Password are required');
    }

    try {
        const scanParams = {
            TableName: process.env.TABLE_NAME_USERS,
            FilterExpression: '#username = :username',
            ExpressionAttributeNames: {
                '#username': 'username',
            },
            ExpressionAttributeValues: {
                ':username': username,
            }
        };

        const scanCommand = new ScanCommand(scanParams);
        const result = await db.send(scanCommand);

   // Check if the username exists
   if (!result.Items || result.Items.length === 0) {
    return sendError(res, 404, 'User not found');
  }

  const user = result.Items[0]; // Assuming the first item is the user

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
            return sendError(res, 400, { error: 'Invalid Password' });
        }

        const token = createToken(user.userId);
        return sendResponse(res, 200, { success: true,
            message: 'Login successful', token: token });

    } catch (error) {
        console.error('Problem with login:', error);
        return sendError(res, 500, { success: false, error: 'Problem with login' });
    }
});

module.exports = router;
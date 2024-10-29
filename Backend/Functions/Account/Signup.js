const express = require('express');
const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../Response/response');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../../utils/bcrypt');
const { PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Check for required fields
    if (!username || !password) {
        return sendError(res, 400, { success: false, error: 'Username and Password are required' });
    }

 

    try {

          // Check if username already exists
    const scanParams = {
        TableName: process.env.TABLE_NAME_USERS,
        FilterExpression: '#username = :username',
        ExpressionAttributeNames: {
          '#username': 'username',
        },
        ExpressionAttributeValues: {
          ':username': username,
        },
      };

      const scanCommand = new ScanCommand(scanParams);
      const result = await db.send(scanCommand);

      if (result.Items && result.Items.length > 0) {
        return sendError(res, 403, 'Username already exists, pick another Username');
      }
  
        // Hash the password
        const hashedPassword = await hashPassword(password);
        const userId = uuidv4();

        // Create the user in the database
        const putParams = {
            TableName: process.env.TABLE_NAME_USERS,
            Item: {
                userId: userId,
                username: username,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            },
        };
        const putCommand = new PutCommand(putParams);

        await db.send(putCommand);
        return sendResponse(res, 200, { success: true, message: 'Account created successfully', data: { userId: userId } });

    } catch (error) {
        console.error('Error creating account:', error);
        return sendError(res, 500, { success: false, error: 'Problem with creating account' });
    }
});

module.exports = router;

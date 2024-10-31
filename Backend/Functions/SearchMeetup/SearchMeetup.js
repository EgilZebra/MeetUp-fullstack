const express = require('express');
const { sendResponse, sendError } = require('../../Response/response');
const { db } = require('../../services/db');
const { ScanCommand } = require('@aws-sdk/lib-dynamodb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const Search = req.query.Search;

    if (!process.env.TABLE_NAME_MEETINGS) {
      return sendError(res, 500, { success: false, error: 'Table name not set' });
    }

    if (!Search) {
      const scanParams = {
        TableName: process.env.TABLE_NAME_MEETINGS,
        Limit: 30,
      };

      const result = await db.send(new ScanCommand(scanParams));

      if (result.Items.length === 0) {
        return sendResponse(res, 204, { success: true, data: [] });
      }

      return sendResponse(res, 200, { success: true, data: result.Items });
    }

    const scanParams = {
      TableName: process.env.TABLE_NAME_MEETINGS,
      FilterExpression: 'contains (lower(name), :Search)',
      ExpressionAttributeValues: {
        ':Search': Search.toLowerCase(),
      },
    };

    const result = await db.send(new ScanCommand(scanParams));

    if (result.Items.length === 0) {
      return sendResponse(res, 204, { success: true, data: [] });
    }

    return sendResponse(res, 200, { success: true, data: result.Items });
  } catch (error) {
    return sendError(res, 500, { success: false, error: error.message });
  }
});

module.exports = router;
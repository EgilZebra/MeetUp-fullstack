const express = require('express');
const { db } = require('../../services/db');
const { sendResponse, sendError } = require('../../Response/response');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
dotenv.config();



const router = express.Router();

router.post('/', async (req, res) => {

try {


        // Get the meetup data from the request body

        const { city, location, starttime, endtime, capacity, name, participants } = req.body;
  // Validate the meetup data
  if (!city || !location || !starttime || !endtime || !capacity || !name) {
    return sendError(res, 400, 'Please provide all required fields');
  }
    
    // Generate a unique meetup ID
    const MeetingId = uuidv4();

    // Create the meetup in the database
    const putParams = {
        TableName: process.env.TABLE_NAME_MEETINGS,
        Item: {
            MeetingId: MeetingId,
            host: req.user.username,
            city: city,
            location: location,
            starttime: starttime,
            endtime: endtime,
            capacity: capacity,
            name: name,
            participants: participants,
            createdAt: new Date().toISOString(),
        },
        
      ConditionExpression: 'attribute_not_exists(id)',
    };
    
const result  = await db.send(new PutCommand(putParams));

    // Return a success response
    return sendResponse(res, 200,  { success: true, message: 'Meeting created successfully' });
} catch (error) {
    // Return an error response
    return sendError(res, 500, { success: false, error: error.message });
  }
});

module.exports = router;
const { DeleteCommand, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb')
const { db } = require('../../services/db')

const RegisterMU = async ( req, res ) => { 

    const reqBody = req.body;
    if ( !reqBody.userName ) {
        res.status(400).json({
            success: false,
            error: 'Missing userName in request'
        })
    } else if ( !reqBody.meetingId ) {
        res.status(400).json({
            success: false,
            error: 'Missing meetingId in request'
        })
    }

    const registerParams = {
            TableName: process.env.TABLE_NAME_MEETINGS,
            Key: {
                'MeetingId': reqBody.meetingId
            },
            UpdateExpression: 'set participants = list_append(if_not_exists(participants, :emptyList), :new_participant)',
            ExpressionAttributeValues: {
                ':new_participant': [reqBody.userName],
                ':emptyList': []
            },
            ReturnValue: 'ALL_NEW'
        };
    
    try {
        const response = await db.send(new UpdateCommand(registerParams));
        res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to register at that meet-up',
            error: error.message
        })
    }}

const UnRegisterMU = async ( req, res ) => { 

    const reqBody = req.body;
    if ( !reqBody.userName ) {
        res.status(400).json({
            success: false,
            error: 'Missing userName in request'
        })
    } else if ( !reqBody.meetingId ) {
        res.status(400).json({
            success: false,
            error: 'Missing meetingId in request'
        })
    }
    let indexOfName;

    try {
        const queryParams = {
            TableName: process.env.TABLE_NAME_MEETINGS,
            KeyConditionExpression: '#MeetingId = :MeetingId',
            ExpressionAttributeNames: {
                '#MeetingId': 'MeetingId'
            },
            ExpressionAttributeValues: {
                ':MeetingId': reqBody.meetingId
            },
        }
        const queryResults = await db.send(new QueryCommand(queryParams))
        indexOfName = queryResults.Items[0].participants.indexOf(reqBody.userName);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'No meet-up with that Id',
            error: error.message
        })
    }

    try {
        const updateParams = {
            TableName: process.env.TABLE_NAME_MEETINGS,
            Key: {
                'MeetingId': reqBody.meetingId
            },
            UpdateExpression: `REMOVE participants[${indexOfName}]`,
            ConditionExpression: 'contains(participants, :userName)',
            ExpressionAttributeValues: {
                ':userName': reqBody.userName
            }
        };
        const response = await db.send(new UpdateCommand(updateParams));
        res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to remove register from that meet-up',
            error: error.message
        })
    }}

module.exports = { RegisterMU, UnRegisterMU };
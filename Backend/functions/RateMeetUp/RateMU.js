const { UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { db } = require('../../services/db');

const RateMU = async (req, res) => {

    const reqBody = req.body;
    if (!reqBody.meetingId) {
        res.status(400).json({
            success: false,
            error: 'Missing meetingId in request'
        })
    } else if ( !reqBody.score ) {
        res.status(400).json({
            success: false,
            error: 'Missing score in request'
        })
    } else if ( !reqBody.comment ) {
        res.status(400).json({
            success: false,
            error: 'Missing comment in request'
        })
    }
    // {  MeetingId: , score: , comment:  }
    const rating = {
        userId: req.user.userId,
        score: reqBody.score,
        comment: reqBody.comment
    }


    const UpdateParams = {
        TableName: process.env.TABLE_NAME_MEETINGS,
        Key: {
            'MeetingId': reqBody.meetingId
        },
        UpdateExpression: 'set comments = list_append(if_not_exists(comments, :emptyList), :new_comment)',
        ExpressionAttributeValues: {
            ':new_comment': [rating],
            ':emptyList': []
        },
        ReturnValue: 'ALL_NEW'
    }

    try {
        const updateComment = await db.send(new UpdateCommand(UpdateParams))
        res.status(200).json({
            success: true,
            data: updateComment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to rate this MeetUp',
            error: error.message
        })
    }
}
module.exports = { RateMU }
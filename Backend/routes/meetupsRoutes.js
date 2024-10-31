const express = require("express");
const { db } = require("../services/db");
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const router = express.Router();
require("dotenv").config();

router.get("/:MeetingId", async (req, res) => {
  const { MeetingId } = req.params;

  try {
    const params = {
      TableName: process.env.TABLE_NAME_MEETINGS,
      Key: { MeetingId },
    };

    const result = await db.send(new GetCommand(params));

    if (!result.Item) {
      return res.status(404).json({
        success: false,
        error: "Meeting not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.Item,
    });
  } catch (error) {
    console.error("Error fetching meeting:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve meeting",
      error: error.message,
    });
  }
});
module.exports = router;

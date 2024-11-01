require("dotenv").config();
const express = require("express");
const { db } = require("../services/db");
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.scan({
      TableName: process.env.TABLE_NAME_MEETINGS,
    });

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const upcomingMeetups = result.Items.filter((meetup) => {
      const meetupDate = new Date(meetup.date);
      meetupDate.setHours(0, 0, 0, 0);
      return meetupDate >= currentDate;
    });

    res.status(200).json({
      success: true,
      data: upcomingMeetups,
    });
  } catch (error) {
    console.error("Error fetching meetups:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve meetups",
      error: error.message,
    });
  }
});

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

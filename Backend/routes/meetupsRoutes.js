<<<<<<< HEAD
require("dotenv").config();
=======
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
const express = require("express");
const { db } = require("../services/db");
const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const router = express.Router();
<<<<<<< HEAD
=======
require("dotenv").config();
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075

router.get("/", async (req, res) => {
  try {
    const result = await db.scan({
      TableName: process.env.TABLE_NAME_MEETINGS,
    });

<<<<<<< HEAD
=======
    /**
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const upcomingMeetups = result.Items.filter((meetup) => {
<<<<<<< HEAD
      const meetupDate = new Date(meetup.date);
      meetupDate.setHours(0, 0, 0, 0);
      return meetupDate >= currentDate;
    });

    res.status(200).json({
      success: true,
      data: upcomingMeetups,
=======
      const meetupDate = new Date(meetup.starttime);
      meetupDate.setHours(0, 0, 0, 0);
      return meetupDate >= currentDate;
    });
 */
    res.status(200).json({
      success: true,
      data: result,
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
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
<<<<<<< HEAD
=======
router.post("/", async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await db.scan({
      TableName: process.env.TABLE_NAME_MEETINGS,
    });

    const userMeetups = result.Items.filter(
      (meetup) => meetup.participants && meetup.participants.includes(userId)
    );

    res.status(200).json({
      success: true,
      data: userMeetups,
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
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
module.exports = router;

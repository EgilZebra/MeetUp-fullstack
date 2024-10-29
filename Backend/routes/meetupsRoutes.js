const express = require("express");
const { db } = require("../services/db");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const result = await db.scan({
      TableName: process.env.TABLE_NAME_MEETINGS,
    });

    const currentDate = new Date();

    const upcomingMeetups = result.Items.filter((meetup) => {
      const meetupDate = new Date(meetup.date);
      return meetupDate > currentDate;
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

module.exports = router;

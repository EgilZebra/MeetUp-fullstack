const express = require("express");
const { db } = require("../services/db");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const result = await db.scan({
      TableName: process.env.TABLE_NAME_MEETINGS,
    });

    res.status(200).json({
      success: true,
      data: result.Items,
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

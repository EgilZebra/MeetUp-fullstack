const express = require("express");
const { db } = require("../services/db");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const result = await db.scan({
      TableName: process.env.TABLE_NAME_USERS,
    });

    const userIds = result.Items.map((item) => item.userId);

    res.status(200).json({
      success: true,
      data: userIds,
    });
  } catch (error) {
    console.error("Error fetching user IDs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user IDs",
      error: error.message,
    });
  }
});

module.exports = router;

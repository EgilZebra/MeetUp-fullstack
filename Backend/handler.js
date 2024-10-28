const express = require("express");
const serverless = require("serverless-http");
const { db } = require("./db"); // Import your DynamoDB Document client
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to fetch all user IDs
app.get("/users", async (req, res) => {
  try {
    // Scan the Users table to get all user IDs
    const result = await db.scan({
      TableName: "users-meetings",
    });

    // Extract user IDs from the result
    const userIds = result.Items.map((item) => item.userId); // Assuming each item has a userId attribute

    res.status(200).json({
      success: true,
      data: userIds,
    });
  } catch (error) {
    console.error("Error fetching user IDs:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user IDs",
      error: error.message,
    });
  }
});

// Export the Express app wrapped for serverless
module.exports.handler = serverless(app); // Change this line to use serverless-http

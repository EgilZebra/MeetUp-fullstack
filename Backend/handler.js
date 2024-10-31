const express = require("express");
const serverless = require("serverless-http");
const meetupsRoutes = require("./routes/meetupsRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/meetups", meetupsRoutes);

module.exports.handler = serverless(app);

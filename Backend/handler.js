const express = require("express");
const serverless = require("serverless-http");
const userRoutes = require("./routes/userRoutes");
const meetupsRoutes = require("./routes/meetupsRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/meetups", meetupsRoutes);

module.exports.handler = serverless(app);

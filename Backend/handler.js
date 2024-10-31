const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const cors = require('cors');
const rateMu = require('./functions/RateMeetUp/RateRouter.js');
const meetupsRoutes = require("./routes/meetupsRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', rateMu);
app.use("/meetups", meetupsRoutes);

module.exports.handler = serverless(app);

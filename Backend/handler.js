const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');
const rateMu = require('./functions/RateMeetUp/RateRouter.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', rateMu);

exports.handler = serverless(app);

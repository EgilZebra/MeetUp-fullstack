const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const signupRouter = require('./Functions/Account/Signup'); // Ensure the path is correct
const loginRouter = require('./Functions/Account/Login');
const createMeetupRouter = require('./Functions/CreateMeetup/CreateMeetup');
const SearchMeetupRouter = require('./Functions/SearchMeetup/SearchMeetup');
 const authMiddleware = require('./middleware/Auth/Auth');
require("dotenv").config();
const cors = require('cors');
const rateMu = require('./functions/RateMeetUp/RateRouter.js');
const meetupsRoutes = require("./routes/meetupsRoutes");

const app = express();

app.use(express.json());
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());

// Define routes
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/create-meetup', authMiddleware, createMeetupRouter);
app.use('/Search-meetups', SearchMeetupRouter);
app.use('/', rateMu);
app.use("/meetups", meetupsRoutes);

// Export handler for AWS Lambda
exports.handler = serverless(app);


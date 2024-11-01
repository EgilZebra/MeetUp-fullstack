const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const signupRouter = require('./Functions/Account/Signup'); // Ensure the path is correct
const loginRouter = require('./Functions/Account/Login');
const createMeetupRouter = require('./Functions/CreateMeetup/CreateMeetup');
const SearchMeetupRouter = require('./Functions/SearchMeetup/SearchMeetup');
const authMiddleware = require('./middleware/Auth/Auth');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Apply CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend URL
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you need to allow cookies or authentication
}));

app.use(express.json());
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Define routes
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/create-meetup', authMiddleware, createMeetupRouter);
app.use('/Search-meetups', SearchMeetupRouter);

// Export handler for AWS Lambda
exports.handler = serverless(app);

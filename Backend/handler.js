const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const signupRouter = require('./Functions/Account/Signup'); // Ensure the path is correct
const loginRouter = require('./Functions/Account/Login');
const createMeetupRouter = require('./Functions/CreateMeetup/CreateMeetup');
const SearchMeetupRouter = require('./Functions/SearchMeetup/SearchMeetup');
 const authMiddleware = require('./middleware/Auth/Auth');

/* const userRoutes = require("./routes/userRoutes");
const meetupsRoutes = require("./routes/meetupsRoutes");  */
const dotenv = require("dotenv");



dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Apply authMiddleware to all routes under /auth, except /signup and /login
/* app.use('/auth', authMiddleware); */
//app.use('/api/notes', verifyToken, notes);
// Define routes
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/create-meetup', authMiddleware, createMeetupRouter);
app.use('/Search-meetups', SearchMeetupRouter);
/* app.use("/users", userRoutes);
app.use("/meetups", meetupsRoutes);
 */

// Export handler for AWS Lambda
exports.handler = serverless(app);

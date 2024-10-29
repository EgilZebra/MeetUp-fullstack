import express from 'express';
import bodyParser from 'body-parser';
import signupRouter from './Account/Signup.js'; // Ensure the path is correct
import loginRouter from './Account/Login.js'; // Ensure the path is correct

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Define routes
app.use('/auth/signup', signupRouter);
app.use('/auth/login', loginRouter);

// Export the handler to work with AWS Lambda
export const handler = async (event, context) => {
    return await new Promise((resolve, reject) => {
        app(event, context, (err, response) => {
            if (err) {
                return reject(err);
            }
            resolve(response);
        });
    });
};

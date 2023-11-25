// "npm run server" TO BEGIN THE SERVER
// Initializing express and dotenv
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/lists', require('./routes/listRoutes'));

// Using errorHandler middleware to overwrite default error handler
app.use(errorHandler);

app.listen(port, ()=> console.log(`Listening on port ${port}`));
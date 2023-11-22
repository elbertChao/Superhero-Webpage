// Initializing express and dotenv
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.use('/api/goals', require('./routes/listRoutes'));

app.listen(port, ()=> console.log(`Listening on port ${port}`));
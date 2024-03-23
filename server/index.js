const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// ROUTES
const userRoute = require('./routes/user');
const employeeRoute = require('./routes/employees');
const positionRoute = require('./routes/positions');
const departmentRoute = require('./routes/departments');

app.use('/api/users', userRoute);
app.use('/api/employees', employeeRoute);
app.use('/api/positions', positionRoute);
app.use('/api/departments', departmentRoute);

// PORT CONNECTION
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

// CONNECT TO DB

const uri = process.env.MONGO_URL;
try {
  mongoose.connect(uri);
  console.log('Connected to DB!');
} catch (error) {
  console.log(error);
}

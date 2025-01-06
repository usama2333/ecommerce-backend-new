const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the process if the connection fails
  });

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});


// Routes
app.use('/api/auth', authRoutes);  // Register and login routes

module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

const errorHandler = require('./middleware/errorHandler');

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/zones', require('./routes/zones'));
app.use('/api/branches', require('./routes/branches'));
// app.use('/api/elections', require('./routes/elections'));
// app.use('/api/nominations', require('./routes/nominations'));
// app.use('/api/votes', require('./routes/votes'));
app.use('/api/news', require('./routes/news'));

// Serve index.html for all non-API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

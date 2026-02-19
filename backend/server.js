
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
// No direct DB connection; using mock/Supabase strategy
console.log('Running in Mock/Supabase Mode');

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

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Root redirect to frontend
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f4f4f4;">
        <h1 style="color: #6366f1;">YCA Backend API</h1>
        <p>The frontend is now running on a separate server.</p>
        <a href="http://localhost:3001" style="padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; rounded: 8px; font-weight: bold;">Go to Website (Port 3001)</a>
      </body>
    </html>
  `);
});

// API routes - Use mock handlers temporarily for missing files
app.use('/api/auth', require('./routes/auth'));
app.use('/api/zones', require('./routes/zones'));
// app.use('/api/branches', require('./routes/branches')); // Disabled for now
// app.use('/api/elections', require('./routes/elections')); // Disabled for now
// app.use('/api/membership', require('./routes/membership')); // Disabled for now
// app.use('/api/votes', require('./routes/votes')); // Disabled for now
// app.use('/api/news', require('./routes/news')); // Disabled for now
// app.use('/api/bylaws', require('./routes/bylaws')); // Disabled for now

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// For local development
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

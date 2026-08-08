const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./CONFIG.JS/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({ origin: [
  'http://localhost:3000',
  'https://fleetsystem.vercel.app']
}));
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

app.use(limiter);
app.use(mongoSanitize());

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fleet Management API is running successfully'
  });
});

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/maintenance', require('./routes/maintnance'));
app.use('/api/fuel', require('./routes/fuel'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/geofence', require('./routes/geofence'));
app.use('/api/documents', require('./routes/documents'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
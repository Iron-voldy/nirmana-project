// config/db.js

// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/promo-codes', require('./routes/promoCode'));
app.use('/api/campaigns', require('./routes/campaign'));
app.use('/api/social-media', require('./routes/socialMedia'));
app.use('/api/analytics', require('./routes/analytics'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Marketing Manager API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

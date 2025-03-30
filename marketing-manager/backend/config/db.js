// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load env vars directly

const connectDB = async () => {
  try {
    // Use MONGO_URI directly from process.env
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://admin:12123@marketing-manager.kokhud8.mongodb.net/?retryWrites=true&w=majority&appName=marketing-manager';
    
    console.log('Connecting to MongoDB...'); // Debug log
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
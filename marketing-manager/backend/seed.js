// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Use the User model definition directly in this file to avoid connection issues
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'marketing_manager', 'user'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use a default MongoDB connection string if MONGO_URI isn't defined
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/marketing-manager';
    
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    return false;
  }
};

// Function to create a test user
const createTestUser = async () => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }
    
    // Create a hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Create new user
    const newUser = new User({
      name: 'Marketing Manager',
      email: 'nirmana@gmail.com',
      password: hashedPassword,
      role: 'marketing_manager'
    });
    
    await newUser.save();
    console.log('Test user created successfully');
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

// Run the script
const seedDatabase = async () => {
  const connected = await connectDB();
  
  if (connected) {
    await createTestUser();
    console.log('Database seeding completed');
  } else {
    console.log('Could not connect to the database. Seeding aborted.');
  }
  
  // Close the connection
  mongoose.connection.close();
};

seedDatabase();
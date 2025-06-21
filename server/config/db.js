const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Optional: Handle disconnects gracefully
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    // Optional: Handle errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

  } catch (err) {
    console.error('❌ MongoDB initial connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

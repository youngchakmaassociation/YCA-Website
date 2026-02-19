const mongoose = require('mongoose');
require('dotenv').config();

// Main database connection (for users, auth, core data)
const connectMainDB = async () => {
    try {
        const mainConnection = await mongoose.createConnection(process.env.DATABASE_URL || process.env.MONGODB_URI, {
            // MongoDB Atlas optimized settings
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Main MongoDB Atlas connected');
        return mainConnection;
    } catch (error) {
        console.error('Main MongoDB Atlas connection error:', error);
        // process.exit(1);
    }
};

// Content database connection (for news, events, gallery)
const connectContentDB = async () => {
    try {
        const contentConnection = await mongoose.createConnection(process.env.MONGODB_CONTENT_URI || process.env.DATABASE_URL || process.env.MONGODB_URI, {
            // MongoDB Atlas optimized settings
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Content MongoDB Atlas connected');
        return contentConnection;
    } catch (error) {
        console.error('Content MongoDB Atlas connection error:', error);
        // process.exit(1);
    }
};

// Single database connection (original method)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI, {
            // MongoDB Atlas optimized settings
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('MongoDB Atlas connected');
    } catch (error) {
        console.error('MongoDB Atlas connection error:', error);
        // process.exit(1);
    }
};

module.exports = {
    connectDB,        // Single DB (backward compatible)
    connectMainDB,    // Main DB connection
    connectContentDB  // Content DB connection
};

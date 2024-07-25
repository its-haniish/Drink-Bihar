require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/connectDB.js');
const routes = require('./routes/routes.js');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '200mb' }));
app.use(cors());

app.use('/', routes);

connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
    });
}).catch(error => {
    console.error('Failed to connect to the database and start server:', error);
    process.exit(1); // Exit with failure
});

// Additional error handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
    // Application specific logging, throwing an error, or other logic here
    process.exit(1); // Exit with failure
});

mongoose.connection.on('disconnected', () => {
    console.error('Lost MongoDB connection...');
});

mongoose.connection.on('reconnected', () => {
    console.log('Reconnected to MongoDB');
});
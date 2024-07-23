const mongoose = require('mongoose');


// function to connect to Oolkar database
const connectDB = async (database) => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(database)
        console.log("Connected to Database")
    } catch (error) {
        console.log("Connection failed to Database")
        process.exit(0);
    }
}


module.exports = connectDB;
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const connectDB = require('./utils/connectDB.js')
const routes = require('./routes/routes.js')

app.use(express.json({ limit: '200mb' }));
app.use(cors());

app.use('/', routes);

// calling the connectDB function and listening server in then block
connectDB(process.env.MONGO_URI).then(() => {
    // listening server
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
    });
});




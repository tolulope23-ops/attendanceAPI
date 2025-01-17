const express = require('express');
const connectDB = require('./db/config');
const attendanceRoutes = require('./routes/attendance');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use("/api/v1/", attendanceRoutes);

const PORT = process.env.PORT;

const start = async() => {
    try {
        await connectDB();
        app.listen(PORT, () =>{
            console.log("Server is listening on port:", PORT);
        })
    } catch (error) {
        console.log(error.message); 
    }
}

start();
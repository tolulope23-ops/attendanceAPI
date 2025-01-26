const express = require('express');
const connectDB = require('./db/config');
const attendanceRoute = require('./routes/attendance');
const teacherRoute = require('./routes/attendance');
const studentRoute = require('./routes/attendance');
const studentClassRoute = require('./routes/attendance');

const {errorHandlerMiddleware} = require('./middleware/errorHandler');
 
const app = express();
require('dotenv').config();


app.use(express.json());
app.use("/api/v1/", attendanceRoute);
app.use("/api/v1/", teacherRoute);
app.use("/api/v1/", studentRoute);
app.use("/api/v1/", studentClassRoute);

app.use(errorHandlerMiddleware);

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
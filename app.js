const express = require('express');
const connectDB = require('./db/config');
const attendanceRoute = require('./routes/attendance');
const teacherRoute = require('./routes/teacher');
const studentRoute = require('./routes/student');
const studentClassRoute = require('./routes/student_class');

const {errorHandlerMiddleware} = require('./middleware/errorHandler');
 
const app = express();
require('dotenv').config();


app.use(express.json());
app.use("/api/v1/attendance", attendanceRoute);
app.use("/api/v1/teacher", teacherRoute);
app.use("/api/v1/student", studentRoute);
app.use("/api/v1/class", studentClassRoute);

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
const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;
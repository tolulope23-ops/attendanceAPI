const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    }
});

const teacher = new mongoose.model('teacher', teacherSchema);
module.exports = teacher;
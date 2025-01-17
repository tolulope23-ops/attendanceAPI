const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },

    class_Id:{
        type: mongoose.Schema.ObjectId,
        ref:'class',
        required: true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true,
    },
});

const student = new mongoose.model('student', studentSchema);
module.exports = student;
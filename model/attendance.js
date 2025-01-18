const mongoose = require('mongoose');
const attendanceSchema = mongoose.Schema({
    
    student_Id:{
        type: mongoose.Schema.ObjectId,
        ref:'student',
        required: true
    },

    class_Id:{
        type: mongoose.Schema.ObjectId,
        ref:'class',
        required: true
    },

    status:{
        type:String,
        enum:['present', 'absent'],
        required:true
    },

    attendanceDate: {
        type:Date,
        default: Date.now,
    }
});

const attendance = new mongoose.model('attendance', attendanceSchema);
module.exports = attendance;
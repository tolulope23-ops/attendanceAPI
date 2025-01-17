const mongoose = require('mongoose');
const classSchema = mongoose.Schema({
    className:{
        type:String,
        required:true
    },

    teacher_Id:{
        type: mongoose.Schema.ObjectId,
        ref:'teacher',
        required: true
    },
});

const Student_class = new mongoose.model('class', classSchema);
module.exports = Student_class;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();
const teacherSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required: true
    },

    confirmPassword:{
        type:String,
        required: true
    }
});

teacherSchema.pre('save', async function(next) {
    if(!this.isModified(password)) return;
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

})

teacherSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

const teacher = new mongoose.model('teacher', teacherSchema);
module.exports = teacher;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    }
});

teacherSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

teacherSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

teacherSchema.methods.createJWT = async function () {
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET; 
    
    return jwt.sign(
    {
        id:this._id,
        email:this.email
    },
    JWT_SECRET,
    {
        expiresIn:'30days'
    }
) 
}

const teacher = new mongoose.model('teacher', teacherSchema);
module.exports = teacher;
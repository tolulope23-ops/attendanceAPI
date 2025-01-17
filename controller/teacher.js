const { StatusCodes } = require('http-status-codes');
const Teacher = require('../model/teacher');

const teacherSignUp = async(req, res) => {
    const {fullname, email, password, confirmPassword, phone} = req.body
   try {
        const emailAlreadyExist = await Teacher.findOne({email});
        if(emailAlreadyExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:`Teacher already exist, please login: ${error.message}`,
                data:{} 
            })
        }
        if(password !== confirmPassword){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:`Incorrect password, please confirmPassword again: ${error.message}`,
                data:{} 
            })
        }
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(StatusCodes.CREATED).json({
            status:StatusCodes.CREATED,
            message:"Teacher's infomation created.",
            data:teacher 
        });
   } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`Error creating teacher's infomation: ${error.message}`,
            data:{} 
        })
   }
}

const teacherSignIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const emailAlreadyExist = Teacher.findOne({email});
        if(!emailAlreadyExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`You don't have an account, please signUp: ${error.message}`,
            data:{} 
        })
    }
    const ispasswordCorrect = await Teacher.comparePassword(password);
    if(!ispasswordCorrect){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`Incorrect password, try again: ${error.message}`,
            data:{} 
        })
    }

    res.status(StatusCodes.OK).json({
        status:StatusCodes.OK,
        message:"Teacher logged in",
        data:{
            email,
            password
        } 
    });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`Error logging in: ${error.message}`,
            data:{} 
        })
   }
}

const displayTeachers = async (req, res) =>{
    try {
        const teachers = await Teacher.find();
        if (teachers.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No teacher information found!`,
                data:{}
            })
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Teacher(s) information:",
            data:teachers
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `Error finding teacher!`,
            data:{}
        })
    }
}

const displayTeacher = async(req, res) => {
    const { id } = req.params;
    try {
        const teacher = await Teacher.findById({_id: id});
        if(!teacher){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No teacher information with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Teacher Information: ",
            data:teacher
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `Error finding teacher with the id: ${id}!`,
            data:{}
        })
    }
}

const updateTeacher = async(req, res) =>{
    const { id } = req.params;
    try {
        const teacher = await Teacher.findByIdAndUpdate({_id: id},(req.body), {new:true});
        if(!teacher){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No teacher with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Teacher's information updated!",
            data:teacher
        })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `Error updating teacher with the id: ${id}!`,
            data:{}
        })
    }
}

const deleteTeacher = async (req, res) =>{
    const { id } = req.params
    try {
        const teacher = await Teacher.findByIdAndDelete({_id: id}, {new:true});
        if(!teacher){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No teacher with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Teacher's information deleted!",
            data:teacher
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `Error deleting teacher with the id: ${id}!`,
            data:{}
        })
    }
}

module.exports = {teacherSignUp, teacherSignIn, displayTeachers, displayTeacher, updateTeacher, deleteTeacher};
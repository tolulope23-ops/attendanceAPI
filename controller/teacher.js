const { StatusCodes } = require('http-status-codes');
const Teacher = require('../model/teacher');

const teacherSignUp = async(req, res) => {
    const {fullname, email, password, confirmPassword, phone} = req.body;
   try {
        const emailAlreadyExist = await Teacher.findOne({email});
        if(emailAlreadyExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:`Teacher already exist, please login`,
                data:{} 
            })
        }
        if(password !== confirmPassword){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:`Incorrect password, please confirmPassword again`,
                data:{} 
            })
        }
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(StatusCodes.CREATED).json({
            status:StatusCodes.CREATED,
            message:"Teacher's infomation created.",
            data:{
                teacher:{
                    fullname:teacher.fullName,
                    email:teacher.email,
                    password: teacher.password
                }
            } 
        });
   } catch (error) {
    console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`Error creating teacher's infomation: ${error.message}`,
            data:{} 
        });
   }
}

const teacherSignIn = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const emailAlreadyExist = await Teacher.findOne({email});
        if(!emailAlreadyExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`You don't have an account, please signUp`,
            data:{} 
        })
    }
    const isPasswordCorrect = await emailAlreadyExist.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`Incorrect password, try again`,
            data:{} 
        })
    }

    const accessToken = await emailAlreadyExist.createJWT();
    res.status(StatusCodes.OK).json({
        status:StatusCodes.OK,
        message:"Teacher logged in",
        data:{
            user:{
                id: emailAlreadyExist._id,
                email: emailAlreadyExist.email,
            },
            accessToken
        }
    });
    } catch (error) {
        console.log(error);
        
        res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`Error logging in: ${error.message}`,
            data:{} 
        })
        next();
   }
}

const displayTeachers = async (req, res, next) =>{
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
        next();
    }
}

const displayTeacher = async(req, res, next) => {
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
        next()
    }
}

const updateTeacher = async(req, res, next) =>{
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
       next();
    }
}

const deleteTeacher = async (req, res, next) =>{
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
        next();
    }
}

module.exports = {teacherSignUp, teacherSignIn, displayTeachers, displayTeacher, updateTeacher, deleteTeacher};
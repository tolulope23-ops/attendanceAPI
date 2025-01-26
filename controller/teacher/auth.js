const { StatusCodes } = require('http-status-codes');
const Teacher = require('../../model/teacher');

const teacherSignUp = async(req, res, next) => {
    const {fullName, email, password, confirmPassword, phone} = req.body;
   try {
        const userAlreadyExist = await Teacher.findOne({email});
        if(userAlreadyExist){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:"Teacher already exist",
                data:{} 
            })
        }
        if(password !== confirmPassword){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:StatusCodes.BAD_REQUEST,
                message:"Incorrect password, please confirmPassword again",
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
                }
            } 
        });
   } catch (error) {
        next(error);
   }
}

const teacherSignIn = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await Teacher.findOne({email});
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:"You don't have an account, please signUp",
            data:{} 
        })
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`Incorrect password, please try again`,
            data:{} 
        })
    }

    const accessToken = await user.createJWT();
    res.status(StatusCodes.OK).json({
        status:StatusCodes.OK,
        message:"Teacher logged in",
        data:{
            user:{
                id: user._id,
                email: user.email,
            },
            accessToken
        }
    });
    } catch (error) {
        next();
   }
}

const displayTeachers = async (req, res, next) =>{
    try {
        const teachers = await Teacher.find();
        if (teachers.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: "No teacher information found!",
                data:{}
            })
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message:"",
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
const { StatusCodes } = require('http-status-codes');
const Student_class = require('../model/student_class');

const addClass = async(req, res, next) => {
   try {
        const studentClasses = new Student_class(req.body);
        await studentClasses.save();
        res.status(StatusCodes.CREATED).json({
            status:StatusCodes.CREATED,
            message:" Student's class created.",
            data:studentClasses 
        })
   } catch (error) {
        next(error);
    }
}

const displayClasses = async (req, res, next) =>{
    try {
        const studentClasses = await Student_class.find();
        if (studentClasses.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student's class found!`,
                data:{}
            })
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student's classes: ",
            data:studentClasses
        })
    } catch (error) {
        next(error);
    }
}

const displayClass = async(req, res, next) => {
    const { id } = req.params;
    try {
        const studentClass = await Student_class.findById({_id: id}).populate('teacher_Id');
        if(!studentClass){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student's class information with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student's class",
            data:studentClass
        })
    } catch (error) {
        next(error);
    }
}

const updateClass = async(req, res, next) =>{
    const { id } = req.params;
    try {
        const studentClass = await Student_class.findByIdAndUpdate({_id: id},(req.body), {new:true});
        if(!studentClass){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student class with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student's class updated!",
            data:studentClass
        })

    } catch (error) {
        next(error);
    }
}

const deleteClass = async (req, res, next) =>{
    const { id } = req.params
    try {
        const studentClasses = await Student_class.findByIdAndDelete({_id: id}, {new:true});
        if(!studentClasses){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student class with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student's class information deleted!",
            data:studentClasses
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {addClass, displayClasses, displayClass, updateClass, deleteClass}
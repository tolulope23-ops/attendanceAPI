const { StatusCodes } = require('http-status-codes');
const Student = require('../model/student');

const addStudent = async(req, res, next)=>{
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(StatusCodes.CREATED).json({
            status:StatusCodes.CREATED,
            message:"student information created.",
            data:student 
        })
    } catch (error) {
        next(error);
    }
}

const displayStudents = async (req, res, next) =>{
    try {
        const students = await Student.find();
        if (students.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student information found!`,
                data:{}
            })
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student(s) information: ",
            data:students
        })
    } catch (error) {
        next(error);
    }
}

const displayStudent = async(req, res, next) => {
    const { id } = req.params;
    try {
        const student = await Student.findById({_id: id}).populate('class_Id');
        if(!student){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student information with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student information",
            data:student
        })
    } catch (error) {
        next(error);
    }
}

const updateStudent = async(req, res, next) =>{
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndUpdate({_id: id},(req.body), {new:true});
        if(!student){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student's information updated!",
            data:student
        })

    } catch (error) {
        next(error);
    }
}

const deleteStudent = async (req, res, next) =>{
    const { id } = req.params
    try {
        const student = await Student.findByIdAndDelete({_id: id}, {new:true});
        if(!student){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student's information deleted!",
            data:student
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {addStudent, displayStudents, displayStudent, updateStudent, deleteStudent};
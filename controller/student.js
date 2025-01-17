const { StatusCodes } = require('http-status-codes');
const Student = require('../model/student');

const addStudent = async(req, res)=>{
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(StatusCodes.CREATED).json({
            status:StatusCodes.CREATED,
            message:"student information created.",
            data:student 
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status:StatusCodes.BAD_REQUEST,
            message:`student not created:${error.message}`,
            data:{} 
        })
    }
}

const displayStudents = async (req, res) =>{
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
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `Error finding student!`,
            data:{}
        })
    }
}

const displayStudent = async(req, res) => {
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
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `Error finding student with the id: ${id}! ${error}`,
            data:{}
        })
    }
}

const updateStudent = async(req, res) =>{
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
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `Error updating student with the id: ${id}!`,
            data:{}
        })
    }
}

const deleteStudent = async (req, res) =>{
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
        res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            message: `Error deleting student with the id: ${id}!`,
            data:{}
        })
    }
}


module.exports = {addStudent, displayStudents, displayStudent, updateStudent, deleteStudent};
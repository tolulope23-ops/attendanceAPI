const { StatusCodes } = require('http-status-codes');
const Attendance = require('../model/attendance');

const addAttendance = async(req, res, next) => {
   try {
        const attendant = new Attendance(req.body);
        await attendant.save();
        res.status(StatusCodes.CREATED).json({
            status:StatusCodes.CREATED,
            message:"Attendance created.",
            data:attendant
        });
   } catch (error) {
     next(error);
   }
}

const displayAttendanceById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const attendant = await Attendance.findById({_id:id}).populate('student_Id');
        if(!attendant){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student's attendance information found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Attendance Report: ",
            data:attendant
        })
    } catch (error) {
        next(error);
    }
}

const attendanceHistory = async (req, res, next) =>{
    try {
        const attendants = await Attendance.find();
        if (attendants.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student attendance information found!`,
                data:{}
            })
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student attendance history: ",
            data:attendants
        })
    } catch (error) {
        next(error);
    }
}

const attendanceWeeklyReport = async(req, res, next) => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 8);
    try {
        const attendants = await Attendance.find({attendanceDate: {$gte:oneWeekAgo, $lte:today}});
        if(!attendants){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No student's attendance information found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Weekly Attendance Report: ",
            data:attendants
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updateAttendance= async(req, res, next) =>{
    const { id } = req.params;
    try {
        const attendants = await Attendance.findByIdAndUpdate({_id: id},(req.body), {new:true});
        if(!attendants){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No attendance with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Student's attendance updated!",
            data:attendants
        })

    } catch (error) {
        next(error);
    }
}

const deleteAttendance = async (req, res, next) =>{
    const { id } = req.params;
    try {
        const attendant = await Attendance.findByIdAndDelete({_id: id}, {new:true});
        if(!attendant){
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: `No attendance with the id: ${id} found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Attendance deleted!",
            data:attendant
        })
    } catch (error) {
        next(error);
    }
}


module.exports = {addAttendance, displayAttendanceById, attendanceHistory, attendanceWeeklyReport, updateAttendance, deleteAttendance};
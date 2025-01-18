const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isAuthenticated');

const { addStudent, displayStudents, displayStudent, updateStudent, deleteStudent } = require('../controller/student');
const { addClass, displayClasses, displayClass, updateClass, deleteClass } = require('../controller/student_class');
const { teacherSignUp, displayTeachers, displayTeacher, updateTeacher, deleteTeacher, teacherSignIn } = require('../controller/teacher');
const { addAttendance, attendanceWeeklyReport, attendanceHistory, deleteAttendance, updateAttendance, displayAttendanceById} = require('../controller/attendance');


//POST REQUEST
router.post('/student/add', addStudent);
router.post('/teacher/signUp', teacherSignUp);
router.post('/teacher/signIn', teacherSignIn);
router.post('/class/add', addClass);
router.post('/attendance/add', isUserAuthenticated,addAttendance);

//Get REQUEST
router.get('/student/', displayStudents);
router.get('/student/:id', displayStudent);

router.get('/teacher/', displayTeachers),
router.get('/teacher/:id', displayTeacher);

router.get('/class/', displayClasses);
router.get('/class/:id', displayClass);

router.get('/attendance/:id', isUserAuthenticated, displayAttendanceById);
router.get('/history/', isUserAuthenticated, attendanceHistory);
router.get('/weekly', isUserAuthenticated, attendanceWeeklyReport);

//PUT REQUEST
router.put('/student/update/:id', updateStudent);
router.put('/teacher/update/:id', updateTeacher);
router.put('/class/update/:id', updateClass);
router.put('/attendance/update/:id',isUserAuthenticated, updateAttendance);

//DELETE REQUEST
router.delete('/student/delete/:id', deleteStudent);
router.delete('/teacher/delete/:id', deleteTeacher);
router.delete('/class/delete/:id', deleteClass);
router.delete('/attendance/:id',isUserAuthenticated, deleteAttendance);

module.exports = router;
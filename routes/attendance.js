const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isAuthenticated');
const { addAttendance, attendanceWeeklyReport, attendanceHistory, deleteAttendance, updateAttendance, displayAttendanceById} = require('../controller/attendance');


router.post('/attendance/add', isUserAuthenticated, addAttendance);

router.get('/attendance/:id', isUserAuthenticated, displayAttendanceById);
router.get('/history/', isUserAuthenticated, attendanceHistory);
router.get('/weekly', isUserAuthenticated, attendanceWeeklyReport);

router.put('/attendance/update/:id',isUserAuthenticated, updateAttendance);
router.delete('/attendance/:id',isUserAuthenticated, deleteAttendance);

module.exports = router;
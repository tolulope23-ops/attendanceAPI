const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isAuthenticated');
const { addAttendance, attendanceWeeklyReport, attendanceHistory, deleteAttendance, updateAttendance, displayAttendanceById} = require('../controller/attendance');


router.post('/add', isUserAuthenticated, addAttendance);

router.get('/:id', isUserAuthenticated, displayAttendanceById);
router.get('/', isUserAuthenticated, attendanceHistory);
router.get('/weekly/report', isUserAuthenticated, attendanceWeeklyReport);

router.put('/:id',isUserAuthenticated, updateAttendance);
router.delete('/:id',isUserAuthenticated, deleteAttendance);

module.exports = router;
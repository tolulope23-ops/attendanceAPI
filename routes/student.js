const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isAuthenticated');

const { addStudent, displayStudents, displayStudent, updateStudent, deleteStudent } = require('../controller/teacher.js/student');

router.post('/student/add', isUserAuthenticated, addStudent);

router.get('/student/', displayStudents);
router.get('/student/:id', displayStudent);

router.put('/student/update/:id', isUserAuthenticated, updateStudent);
router.delete('/student/delete/:id', isUserAuthenticated, deleteStudent);


module.exports = router;
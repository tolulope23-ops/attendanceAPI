const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middleware/isAuthenticated');

const { addStudent, displayStudents, displayStudent, updateStudent, deleteStudent } = require('../controller/teacher/student');

router.post('/add', isUserAuthenticated, addStudent);

router.get('/', displayStudents);
router.get('/:id', displayStudent);

router.put('/:id', isUserAuthenticated, updateStudent);
router.delete('/:id', isUserAuthenticated, deleteStudent);


module.exports = router;
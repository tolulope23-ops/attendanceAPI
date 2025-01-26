const express = require('express');
const router = express.Router();
const { validateSignUp, validateSignIn, validate } = require('../utils/validation');

const { teacherSignUp, displayTeachers, displayTeacher, updateTeacher, deleteTeacher, teacherSignIn } = require('../controller/teacher/auth');


router.post('/signUp',validateSignUp(), validate, teacherSignUp);
router.post('/signIn',validateSignIn(), validate, teacherSignIn);

router.get('/', displayTeachers),
router.get('/:id', displayTeacher);

router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;
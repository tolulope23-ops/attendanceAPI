const express = require('express');
const router = express.Router();
const { validationRules, validate } = require('../utils/validation');

const { teacherSignUp, displayTeachers, displayTeacher, updateTeacher, deleteTeacher, teacherSignIn } = require('../controller/teacher/auth');


router.post('/teacher/signUp',validationRules(), validate, teacherSignUp);
router.post('/teacher/signIn',validationRules(), validate, teacherSignIn);

router.get('/teacher/', displayTeachers),
router.get('/teacher/:id', displayTeacher);

router.put('/teacher/update/:id', updateTeacher);
router.delete('/teacher/delete/:id', deleteTeacher);

module.exports = router;
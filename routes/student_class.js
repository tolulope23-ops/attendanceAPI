const express = require('express');
const router = express.Router();
const { addClass, displayClasses, displayClass, updateClass, deleteClass } = require('../controller/student_class');

router.post('/class/add', addClass);

router.get('/class/', displayClasses);
router.get('/class/:id', displayClass);

router.put('/class/update/:id', updateClass);
router.delete('/class/delete/:id', deleteClass);

module.exports = router;
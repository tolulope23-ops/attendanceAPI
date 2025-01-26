const express = require('express');
const router = express.Router();
const { addClass, displayClasses, displayClass, updateClass, deleteClass } = require('../controller/student_class');

router.post('/add', addClass);

router.get('/', displayClasses);
router.get('/:id', displayClass);

router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

module.exports = router;
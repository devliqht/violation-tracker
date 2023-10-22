const express = require('express')
const Student = require('../models/studentModel')
const { 
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
} = require('../controllers/studentController')

const {
    getViolations,
    createViolation
} = require('../controllers/violationsController')

const router = express.Router()

// STUDENTS

// GET all students
router.get('/', getStudents)
// GET a single student
router.get('/:id', getStudent)
// POST a new student
router.post('/', createStudent)
// DELETE a student
router.delete('/:id', deleteStudent)
// UPDATE a student
router.patch('/:id', updateStudent)

router.get('/:id/violations', getViolations)

router.post('/:id/violations', createViolation)

module.exports = router
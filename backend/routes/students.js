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
    createViolation,
    deleteViolation
} = require('../controllers/violationsController')

const studentRouter = express.Router()

// STUDENTS

// GET all students
studentRouter.get('/', getStudents)
// GET a single student
studentRouter.get('/:id', getStudent)
// POST a new student
studentRouter.post('/', createStudent)
// DELETE a student
studentRouter.delete('/:id', deleteStudent)
// UPDATE a student
studentRouter.patch('/:id', updateStudent)

module.exports = studentRouter
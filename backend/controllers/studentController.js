const Student = require('../models/studentModel')
const mongoose = require('mongoose')

// GET all students
const getStudents = async (req, res) => {
    const students = await Student.find({}).sort({createdAt: -1})

    res.status(200).json(students)
}
// GET a single student
const getStudent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student exists'})
    }

    const student = await Student.findById(id)

    if (!student) {
        return res.status(404).json({error: 'No such student exists'})
    }

    res.status(200).json(student)
}

// POST a new student
const createStudent = async (req, res) => {
    const {studentName, studentID, studentBlocksection} = req.body

    // Add Student to Database
    try {
        const student = await Student.create({studentName, studentID, studentBlocksection})
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a student
const deleteStudent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student exists'})
    }

    const student = await Student.findOneAndDelete({_id: id})

    if (!student) {
        return res.status(404).json({error: 'No such student exists'})
    }

    res.status(200).json(student)

}


// PATCH a student
const updateStudent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student exists'})
    }

    const student = await Student.findOneAndUpdate({_id: id}, {
      ...req.body  
    })

    if (!student) {
        return res.status(404).json({error: 'No such student exists'})
    }

    res.status(200).json(student)
} 



// EXPORTS
module.exports = { 
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
}
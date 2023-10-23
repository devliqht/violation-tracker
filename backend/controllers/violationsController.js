const Violation = require('../models/violationModel')
const mongoose = require('mongoose')

// GET all violations
const getViolations = async (req, res) => {
    const violations = await Violation.find({}).sort({createdAt: -1})

    res.status(200).json(violations)
}

// POST a new violation to a student
const createViolation = async (req, res) => {
    const {violationName, violationInfo, violationDate} = req.body

    // Add Violation to Database
    try {
        const violation = await Violation.create({violationName, violationInfo, violationDate})
        res.status(200).json(violation)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a violation
const deleteViolation = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such violation exists 1'})
    }

    const violation = await Violation.findOneAndDelete({_id: id})

    if (!violation) {
        return res.status(404).json({error: 'No such violation exists 2'})
    }

    res.status(200).json(violation)

}

module.exports = {
    getViolations,
    createViolation,
    deleteViolation
}
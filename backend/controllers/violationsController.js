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

module.exports = {
    getViolations,
    createViolation
}
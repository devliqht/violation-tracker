// routes/violations.js
const express = require('express');
const router = express.Router({mergeParams: true});
const Violation = require('../models/violationModel');
const Student = require('../models/studentModel')
const mongoose = require('mongoose')

// Add a new violation to a specific student
router.post('/', async (req, res) => {
  try {
    // Get the student ID from the request parameters
    const studentId = req.params.id;

    // Create a new violation object
    const violation = await Violation.create({
      violationName: req.body.violationName,
      violationInfo: req.body.violationInfo,
      violationDate: req.body.violationDate,
      violationStatus: req.body.violationStatus,
      // Other fields as needed
    });
    // Save the violation to the student's document in the database
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.violations.push(violation);
    await student.save();

    res.status(201).json(violation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
    try {
      const studentId = req.params.id;
      const student = await Student.findById(studentId).populate('violations');
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student.violations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
        const violationID = req.params.id;
        const violations = await Violation.findById(violationID).populate();
    
        //res.json({message: 'Hello ' + violationID});
        res.json(violations)
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
  });

  router.delete('/:id', async (req, res) => {
    const violationID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(violationID)) {
      return res.status(404).json({error: 'No such violation exists'})
    }

    const violations = await Violation.findOneAndDelete({_id: violationID});

    if (!violations) {
        return res.status(404).json({error: 'No such violation exists'})
    }
    
    res.status(200).json(violations)
  })

  router.patch('/:id', async (req, res) => {
    const violationID  = req.params.id;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(violationID)) {
        return res.status(404).json({error: 'No such violation exists 1 patch'})
    }


    const violations = await Violation.findOneAndUpdate({_id: violationID}, { ...req.body }, {new: true})

    if (!violations) {
        return res.status(404).json({error: 'No such violation exists 2'})
    }

    res.status(200).json(violations)
  })

module.exports = router;
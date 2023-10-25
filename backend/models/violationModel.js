const mongoose = require('mongoose')
const Schema = mongoose.Schema

const violationSchema = Schema({
    violationName: {
        type: String,
        required: true
    },
    violationInfo: {
        type: String,
        required: true
    },
    violationDate: {
        type: String,
        required: true
    },
    violationStudentID: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Violation', violationSchema)
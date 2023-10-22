const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = Schema({
    studentName: {
        type: String,
        required: true
    },
    studentID: {
        type: Number, 
        required: true
    },
    studentBlocksection: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)
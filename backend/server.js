require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/students')
const violationRoutes = require('./routes/violations')
// Express App
const app = express()
// Middle ware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// Routes
app.use('/api/students', studentRoutes)
app.use('/api/students/:id/violations', violationRoutes)


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected! Listening on port ', process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error)
    })


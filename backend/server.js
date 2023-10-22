require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/students')
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


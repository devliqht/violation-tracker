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

app.get('/', (req, res) => {
    res.send("please work im going insane");
})

// Connect to DB
mongoose.connect("mongodb+srv://ayerinmattxc:g3YR6DvjayVOECYS@violationtracker.fpqujlc.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT || 8000, () => {
            console.log('fr Connected! Listening on port 8000')
        }) 
    })
    .catch((error) => {
        console.log(error)
    })


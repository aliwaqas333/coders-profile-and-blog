const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 5000
const bodyparser = require('body-parser')
const passport = require('passport')

// Body parser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
// routes
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')
const property = require('./routes/api/property')

const db = require('./config/keys').mongoURI

mongoose
    .connect(db)
    .then(() => {
        console.log('db connected')
    })
    .catch((e) => {
        console.log('Error connecting to DB')
    })

// use routes
//app.use('api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)
app.use('/api/users/', users)
app.use('/api/property', property)

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport.js')

app.listen(port, () => {
    console.log(`Server running on Port ${port}`)
})

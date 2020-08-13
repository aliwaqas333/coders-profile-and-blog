const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 5000;

// routes
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

const db = require('./config/keys').mongoURI

mongoose.connect(db).then(()=>{
    console.log('db connected')
}).catch(e=>{console.log(e)})

// use routes
//app.use('api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)
app.use('/api/users/', users)


app.get('/', (req, res)=>res.send('hello'));

app.listen(port, ()=>{console.log(`Server running on Port ${port}`)})
const express = require('express')
const Router = express.Router()

Router.get('/test', (req, res)=>{
    res.json({msg:'Profile Working'})
})
module.exports=Router
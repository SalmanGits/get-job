require("dotenv").config()
const express = require('express')
const A = require('./models/JobSeeker.js')
const app = express()
const connectToDB = require('./db/db.js')
app.use(express.json())
const port = process.env.PORT || 3000 
//Db Connection
connectToDB()
//----------

app.get("/",(req,res)=>{
   A.create({name:"salamn"}).then(()=>{
    console.log("saved")
   })
})

// Server Listening
app.listen(port,()=>{
    console.log("listening on port " + port)
})


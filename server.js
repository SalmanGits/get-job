require("dotenv").config()
const express = require('express')
const app = express()
const connectToDB = require('./db/db.js')
app.use(express.json())
const port = process.env.PORT || 3000 
const userRoute = require('./routes/UserRoute.js')
//Db Connection
connectToDB()

//----------

app.get("/",(req,res)=>{
  res.json({success:true})
})
app.use('/api',userRoute)

// Server Listening
app.listen(port,()=>{
    console.log("listening on port " + port)
})


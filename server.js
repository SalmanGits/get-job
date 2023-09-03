require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const recruiterRoute = require('./routes/recruiterRoute')
const connectToDB = require('./db/db.js')
const jobRoute = require('./routes/jobRoute')
app.use(express.json())
const port = process.env.PORT || 3000 
const userRoute = require('./routes/UserRoute.js')
app.use(cors())
app.use(express.urlencoded({extended:false}))

//Db Connection
connectToDB()

//----------

app.get("/",(req,res)=>{
  res.json({success:true})
})
app.use('/api',userRoute)
app.use("/api",recruiterRoute)
app.use("/api",jobRoute)

// Server Listening
app.listen(port,()=>{
    console.log("listening on port " + port)
})


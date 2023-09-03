const express = require('express')
const router = express.Router()
const { applyToJobs } = require('../controller/jobController.js')
const Auth = require('../auth/auth')



router.post("/job/apply", Auth, applyToJobs)









module.exports = router
const express = require('express')
const router = express.Router()
const {getUserInfo, postJob,jobListing} = require('../controller/recruiterController.js')
const Auth = require('../auth/auth')
const isRecruiter = require('../auth/isRecruiter.js')

router.get("/recruiter",Auth,isRecruiter,getUserInfo)
router.post("/recruiter/post-job",Auth,isRecruiter,postJob)
router.get("/job-listing",Auth,jobListing)








module.exports = router
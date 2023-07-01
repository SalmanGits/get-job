const express = require('express')
const router = express.Router()
const {loginUser,registerUser} = require('../controller/UserController')


router.post("/login",loginUser)
router.post("/register",registerUser)



module.exports = router
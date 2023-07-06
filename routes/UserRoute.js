const express = require('express')
const router = express.Router()
const {loginUser,registerUser, addUserInfo, getUserInfo} = require('../controller/UserController')
const Auth = require('../auth/auth')



router.post("/login",loginUser)
router.post("/register",registerUser)
router.post("/edit-profile",Auth,addUserInfo)
router.post("/user-profile",Auth,getUserInfo)



module.exports = router
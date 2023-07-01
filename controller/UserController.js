const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async(req,res)=>{
    console.log(req.user)
    const {email,password} = req.body
    const existingUser = await User.findOne({email: email}).exec()
    if(!existingUser) return res.status(400).json({success:false,message:"please register before login"})
    let correctPassword = await bcrypt.compare(password, existingUser.password)
    if(!correctPassword) return res.status(400).json({success:false,message:"wrong credentials"})
    const token = jwt.sign({existingUser},process.env.secret)
    existingUser.password = null
    return res.status(200).json({success:true,data:existingUser,token:token})
    
    
}
const registerUser = async(req,res)=>{
try {
    const {firstName,lastName,email,password,role} = req.body
    let existedUser = await User.findOne({email:email}).exec()
    console.log(existedUser)
    if(existedUser) return res.status(400).json({success:false, message:"user already exist"})
    let hashPassword = await bcrypt.hash(password,10)
    let user = await User.create({firstName,lastName,email,password:hashPassword,role})
    user.password = null
   return res.status(201).json({success:true, data:user})
} catch (error) {
    console.log(error)
    return res.status(500).json({success:false, message:"error in registerUser "})
    
}

}
module.exports = {loginUser,registerUser}
const User = require('../models/User')
const bcrypt = require('bcrypt');

const loginUser = (req,res)=>{
    
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
    res.status(201).json({success:true, data:user})
} catch (error) {
    console.log(error)
    res.status(500).json({success:false, message:"error in registerUser "})
    
}

}
module.exports = {loginUser,registerUser}
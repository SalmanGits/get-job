const mongoose =require('mongoose')

const JobSeeker = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    }
})

const a = mongoose.model('job',JobSeeker)
module.exports = a
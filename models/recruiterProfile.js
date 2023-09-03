const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
  
  },
  website: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  aboutCompany: {
    type: String,
  
  },
  postedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;

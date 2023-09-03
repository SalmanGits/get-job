const User = require("../models/User")
const Job = require("../models/job")
const recruiterProfile = require("../models/recruiterProfile")
const getUserInfo = async (req, res) => {
    try {
        const id = req.user._id
        let recruiter = await recruiterProfile.find({ user: id }).populate("user")
        res.status(200).json({ success: false, recruiter })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error in addUserInfo" })

    }
}

const postJob = async (req, res) => {
    try {
        const { title, description, type, requirements, location } = req.body;
        const recruiter = req.user._id;
        const job = new Job({ title, description, type, requirements, location, recruiter });
        const savedJob = await job.save();
        // Update recruiter schema
        const updateRecruiter = await recruiterProfile.findOneAndUpdate(
            { user: recruiter },
            { $push: { postedJobs: savedJob._id } },
            { new: true }
        );
        return res.json({ success: true, message: "Posted job successfully", job: savedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in postJob" });
    }
};

const jobListing = async (req, res) => {
    try {
        // const jobs = await Job.aggregate([
        //     {
        //         $lookup: {
        //             from: "Recruiter", 
        //             localField: "recruiter",
        //             foreignField: "user",
        //             as: "recruiterData"
        //         }
        //     },
        // ]);
        // const jobs = await Job.find().populate({
        //     path: "recruiter",
        //     model: "Recruiter",
        //     populate: {
        //         path: "user",
        //         model: "User"
        //     }
        // });


        let jobs  = await Job.find()
        let recruiter = await recruiterProfile.find({user:jobs[0].recruiter})
        let user = await User.find({_id:recruiter[0].user})
        jobs = [...jobs,...recruiter,...user]

        return res.json({ success: true, jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching job listings" });
    }
};



module.exports = { getUserInfo, postJob ,jobListing}
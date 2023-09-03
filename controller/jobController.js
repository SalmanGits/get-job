const UserProfile = require("../models/UserProfile");
const Job = require("../models/job");

const applyToJobs = async (req, res) => {
    try {
        const { jobId } = req.body;
        const id = req.user._id;
        
        if (!jobId || !id) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const user = await UserProfile.findOne({ user: id });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const job = await Job.findOne({ _id: jobId });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.appliedUsers.includes(id)) {
            return res.status(400).json({ message: "Already applied" });
        }

        await UserProfile.updateOne({ user: id }, { $push: { appliedJobs: jobId } });
        await Job.updateOne({ _id: jobId }, { $push: { appliedUsers: id } });
        return res.status(200).json({ message: "Applied" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unable to apply" });
    }
};

module.exports = { applyToJobs };

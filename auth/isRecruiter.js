const isRecruiter = (req, res, next) => {
    console.log(req.user)
    if (req.user.role == "recruiter") {
        return next();
    }
    else {
        return res.status(401).json({ message: "You are not a recruiter", result: false })
    }

}
module.exports =isRecruiter
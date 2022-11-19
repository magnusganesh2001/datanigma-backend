const Job = require("../models/job");
const user = require("../models/user");

exports.getJobs = async(req, res, next) => {
    try {
        const jobs = await Job.find();
        return res.status(201).json({
            message: 'Jobs fetched successfully',
            jobs: jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch jobs',
            error: error
        });
    }
}

exports.getJobsOfEmployer = async(req, res, next) => {
    try {
        let jobs = await Job.find();
        jobs = jobs.filter(value => {
            if (value.employer == req.body.id) return true;
            return false;
        });
        return res.status(201).json({
            message: 'Jobs fetched successfully',
            jobs: jobs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to fetch jobs',
            error: error
        });
    }
}

exports.addJob = (req, res, next) => {
    const job = new Job(req.body);
    job.save().then(result => {
        return res.status(201).json({
            message: 'Job added successfully!',
            job
        });
    }).catch(error => {
        return res.status(500).json({
            message: "Job failed to add!"
        });
    });
};

exports.updateJob = (req, res, next) => {
    const job = new Job(req.body);
    Job.updateOne({ _id: job._id, employer: job.employer }, job).then(result => {
        if (result.nModified > 0) {
            return res.status(200).json({
                message: 'Job data updated successfully!',
                job: job
            });
        } else {
            let oldJob;
            Job.findById({ _id: job._id }).then(job => { oldJob = job; });
            return res.status(201).json({
                message: "Job data not modified!",
                job: oldJob
            });
        }
    }).catch(error => {
        let oldJob;
        Job.findById({ _id: job._id }).then(job => { oldJob = job; });
        return res.status(500).json({
            message: "Failed to update job data!",
            job: oldJob
        });
    });
};

exports.applyJob = async(req, res, next) => {
    const { jobId, candidateId } = req.body;
    let job = await Job.findById(jobId);
    if (job.candidates.includes(candidateId))
        return res.status(500).json({
            message: 'Already applied',
            job: job
        });
    job.candidates.push(candidateId);
    job.save().then(result => {
        return res.status(201).json({
            message: 'Job updated successfully!',
            job: job
        });
    }).catch(error => {
        console.log(error);
        return res.status(500).json({
            message: "Job failed to update!"
        });
    });
};

const getCandidatesList = async(jobs) => {
    let c = [];
    jobs.forEach(job => {
        job.candidates.forEach(ca => {
            c.push({
                name: ca.name,
                email: ca.email,
                phone: ca.phone,
                resume: ca.resume,
                jobTitle: job.title,
                jobDesc: job.description,
                jobSalary: job.salary,
                jobType: job.jobType,
                jobSkills: job.skills,
                jobLanguages: job.languages,
            });
        });
    });
    return c;
};

exports.getCandidates = async(req, res, next) => {
    try {
        const userId = req.userData.id;
        let jobs = await Job.find({ 'employer': userId }).populate({ path: 'candidates', model: 'User', select: ['name', 'email', 'phone', 'resume', '_id'] });
        let candidates = await getCandidatesList(jobs);
        return res.status(200).json({
            message: 'Applied candidates fetched',
            candidates: candidates
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to retrieve candidates',
            error
        });
    }
};
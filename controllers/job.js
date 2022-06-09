const Job = require("../models/job");

exports.getJobs = async (req,res,next) => {
  try {
    const jobs = await Job.find();
    res.status(201).json({
      message: 'Jobs fetched successfully',
      jobs: jobs
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch jobs',
      error: error
    });
  }
}

exports.getJobsOfEmployer = async (req,res,next) => {
  try {
    var ObjectId = require('mongoose').Types.ObjectId;
    let jobs = await Job.find();
    console.log(req);
    jobs = jobs.filter(value => {
      if (value.employer == req.userData.id) return true;
      return false;
    });
    console.log(jobs);
    res.status(201).json({
      message: 'Jobs fetched successfully',
      jobs: jobs
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to fetch jobs',
      error: error
    });
  }
}

exports.addJob = (req,res,next) => {
  console.log(req.body);
  const job = new Job(req.body);
  console.log(job);
  job.save().then(result => {
    res.status(201).json({
      message: 'Job added successfully!',
      job: {
        
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: "Job failed to add!"
    });
  });
};

exports.updateJob = (req,res,next) => {
  const job = new Job({

  });
  Job.updateOne({_id: job._id, employer: job.employer}, job).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({
        message: 'Job data updated successfully!',
        job: job
      });
    } else {
      let oldJob;
      Job.findById({_id: job._id}).then(job => {oldJob = job;});
      res.status(201).json({
        message: "Job data not modified!",
        job: oldJob
      });
    }
  }).catch(error => {
    let oldJob;
    Job.findById({_id: job._id}).then(job => {oldJob = job;});
    res.status(500).json({
      message: "Failed to update job data!",
      job: oldJob
    });
  });
};

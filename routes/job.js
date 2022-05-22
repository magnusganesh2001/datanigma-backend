const express = require('express');
const JobsController = require('../controllers/job');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get('/all:employer', checkAuth, JobsController.getJobsOfEmployer);
router.get('/all', checkAuth, JobsController.getJobs);
router.post('/add', checkAuth, JobsController.addJob);

module.exports = router;
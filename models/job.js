const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const jobSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    skills: [{ type: String, required: true }],
    languages: [{ type: String, required: true }],
    benefits: [{ type: String, required: true }],
    urgent: { type: Boolean, required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

jobSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Job', jobSchema);